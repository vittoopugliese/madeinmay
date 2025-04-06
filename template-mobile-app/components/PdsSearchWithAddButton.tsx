import { View, StyleSheet } from 'react-native';
import { PdsInput } from './PdsInput';
import { PdsIconButton } from './PdsIconButton';
import { PdsButton } from './PdsButton';
import { makeIconObject } from '@/utils/sharedFunctions';
import useMediaWidth from '@/hooks/useMediaWidth';

export default function PdsSearchWithAddButton({placeholder, value, onChangeText, onPress, loading, disabled, showAddButton}: any) {
  const { isMobile } = useMediaWidth();

  return (
    <View style={styles.inputContainer}>
      <View style={{flex: 1}}>
        <PdsInput value={value} placeholder={placeholder} disabled={disabled}
          onChangeText={onChangeText} loading={loading} />
      </View>
      {/* remove ! when  */}
      { !showAddButton && (
        <View>
          { isMobile
            ? <PdsIconButton icon="add" onPress={onPress} disabled={disabled} />
            : <PdsButton text="Create" onPress={onPress} style={{ width: 120 }} 
            icon={makeIconObject('left', 'add')} disabled={disabled} />
          }
        </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
    gap: 20,
  },
});