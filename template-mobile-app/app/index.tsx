import { useState, useRef, useEffect } from 'react';
import { View } from "react-native";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { WebView } from 'react-native-webview';
import Toast from "react-native-toast-message";
import { AppConstants } from '@/constants/Constants';

const showToastAlert = (type: any, text: string, message: string) => {
  return Toast.show({
    type: type as any,
    visibilityTime: 3540,
    text1: text,
    text2: message,
  });
};

const isSoundCloudTrackPage = (url: string) => {
  return (
    (url.includes("soundcloud.com") || url.includes("m.soundcloud.com")) &&
    url.match(/(?:m\.)?soundcloud\.com\/[^/]+\/[^/]+(?!\/(sets|albums|playlists))/) !== null &&
    !url.includes("/discover") &&
    !url.includes("/search") &&
    !url.includes("/stream") &&
    !url.includes("/upload") &&
    !url.includes("/feed") &&
    !url.includes("/you")
  );
};

export default function Index() {
  const [trackData, setTrackData] = useState<any>(null);
  const webViewRef = useRef<WebView | null>(null);

  const handleOnNavigationChange = (navState: any) => {
    const currentUrl = navState.url.split("?")[0];
    
    if (isSoundCloudTrackPage(currentUrl)) {
      showToastAlert(AppConstants.INFO, 'Cargando...', 'Obteniendo datos de la pista.');
      setTrackData(null);
      webViewRef.current?.injectJavaScript(`(function() {
          async function extractTrackData() {
            try {
              let data = null;
              
              const hydrationCheck = await new Promise(resolve => {
                const hydrationData = window.__sc_hydration;
                if (hydrationData) {
                  const trackData = hydrationData.find((item) => item.hydratable === "sound");
                  if (trackData && trackData.data) resolve(trackData.data);
                  else resolve(null);
                } else {
                  resolve(null);
                }
              });
              
              if (hydrationCheck) {
                data = hydrationCheck;
              } else {
                const scripts = document.querySelectorAll('script');
                let jsonData = null;
                
                for (const script of scripts) {
                  const content = script.textContent || script.innerText;
                  if (content && content.includes('"title":"') && content.includes('"artwork_url"')) {
                    try {
                      const jsonMatch = content.match(/\{.*"kind":"track".*\}/);
                      if (jsonMatch) {
                        jsonData = JSON.parse(jsonMatch[0]);
                        break;
                      }
                    } catch (e) {
                      console.error("Error parsing JSON:", e);
                    }
                  }
                }

                if (jsonData) {
                  data = jsonData;
                } else {
                  if (window.SC && window.SC.track) {
                    data = window.SC.track;
                  } else if (window.__INITIAL_DATA__ && window.__INITIAL_DATA__.track) {
                    data = window.__INITIAL_DATA__.track;
                  }
                }
              }

              const playButtonContainer = document.querySelector('.PlayableHeader_Information__1_KdS');

              if (playButtonContainer) {
                if (!document.getElementById('sc-download-btn')) {
                  const downloadBtn = document.createElement('button');
                  downloadBtn.id = 'sc-download-btn';
                  downloadBtn.className = 'ControlButton_ControlButton___qsiE ControlButton_DarkBtn__17hNi';
                  downloadBtn.style.marginLeft = '12px';
                  downloadBtn.setAttribute('aria-label', 'Descargar');
                  
                  downloadBtn.innerHTML = \`
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="width: 32px; height: 32px;">
                      <path fill="#fff" d="M12 16l-5-5h3V4h4v7h3l-5 5zm5 4H7v-2h10v2z"></path>
                    </svg>
                  \`;
                  
                  downloadBtn.addEventListener('click', function() {
                    window.ReactNativeWebView.postMessage(JSON.stringify({type: "DOWNLOAD_REQUEST"}));
                  });
                  
                  playButtonContainer.appendChild(downloadBtn);
                }
              }

              return {
                type: "API_FETCH",
                clientId: data.runtimeConfig.clientId,
                trackId: data.props.pageProps.trackUrn.replace("soundcloud:tracks:", ""),
                userId: data.props.pageProps.userUrn.replace("soundcloud:users:", ""),
              };
            } catch (error) {
              console.error("Extraction error:", error);
              return { 
                type: "API_FETCH",
                error: error.toString() 
              };
            }
          }
          
          setTimeout(async () => {
            const data = await extractTrackData();
            window.ReactNativeWebView.postMessage(JSON.stringify(data));
          }, 2540);
          
          return true;
        })();`
      );
    } else {
      setTrackData(null);
    }
  };

  const fetchStreamUrl = async (clientId: string, trackId: string) => {
    try {
      const response = await fetch(`https://api-v2.soundcloud.com/tracks/${trackId}?client_id=${clientId}`);
      const data = await response.json();
  
      if (data.media && data.media.transcodings) {
        const mp3Transcoding = data.media.transcodings.find(
          (transcoding: any) => transcoding.format.protocol === 'progressive' && transcoding.format.mime_type === 'audio/mpeg'
        );
  
        if (mp3Transcoding) {
          const streamResponse = await fetch(`${mp3Transcoding.url}?client_id=${clientId}`);
          const streamData = await streamResponse.json();
          return streamData.url;
        }
      }
  
      return null;
    } catch (error) {
      console.error("Error fetching stream URL:", error);
      return null;
    }
  };

  const downloadFile = async (mp3Url: string, artist: string, title: string) => {
    showToastAlert(AppConstants.INFO, 'Descargando', 'Descargando archivo...');

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        showToastAlert(AppConstants.ERROR, 'Error', 'Se necesitan permisos para guardar la descarga');
        return;
      }
      const sanitizedFileName = `${artist}-${title}`.replace(/[^a-z0-9 -]/gi, "_") + '.mp3';
      
      FileSystem.downloadAsync(mp3Url, FileSystem.documentDirectory + sanitizedFileName).then(({ uri }) => {
        MediaLibrary.saveToLibraryAsync(uri).then(() => {
          showToastAlert(AppConstants.SUCCESS, 'Descarga Completa', 'La pista se ha descargado correctamente');
        }).catch((error) => {
          console.error("Error al guardar archivo:", error);
          showToastAlert(AppConstants.ERROR, 'Error', 'Error al guardar archivo en la galería');
        });
      });
    } catch (error: any) {
      console.error("Error en la descarga:", error);
      showToastAlert(AppConstants.ERROR, 'Error', `Error al descargar: ${error.message || 'Error desconocido'}`);
    }
  };

  const handleOnMessageRequest = async (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      
      if (data.type === "API_FETCH") {
        if (data.error) {
          showToastAlert(AppConstants.ERROR, 'Error', `Error al obtener datos de la API: ${data.error}`);
        } else if (data.clientId && data.trackId) {
          const trackResponse = await fetch(`https://api-v2.soundcloud.com/tracks/${data.trackId}?client_id=${data.clientId}`);
          const trackData = await trackResponse.json();
          
          setTrackData({
            artist: trackData.user.username,
            title: trackData.title,
            clientId: data.clientId,
            trackId: data.trackId
          });
        }
      } else if (data.type === "DOWNLOAD_REQUEST") {
        if (!trackData) {
          showToastAlert(AppConstants.ERROR, 'Error', 'No se ha encontrado información de la pista');
          return;
        }
        
        showToastAlert(AppConstants.INFO, 'Procesando', 'Obteniendo URL de descarga...');
        
        const streamUrl = await fetchStreamUrl(trackData.clientId, trackData.trackId);

        if (streamUrl) {
          downloadFile(streamUrl, trackData.artist, trackData.title);
        } else {
          showToastAlert(AppConstants.ERROR, 'Error', 'No se pudo obtener la URL de descarga');
        }
      }
    } catch (error: any) {
      showToastAlert(AppConstants.ERROR, 'Error', `Error al procesar mensaje: ${error.message}`);
    }
  };

  useEffect(() => {
    return () => {
      setTrackData(null);
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <WebView 
        ref={webViewRef} 
        source={{uri: "https://m.soundcloud.com/zaphyremusic/low-life-crisis"}} 
        javaScriptEnabled 
        domStorageEnabled
        onNavigationStateChange={handleOnNavigationChange} 
        onMessage={handleOnMessageRequest} 
      />
    </View>
  );
};