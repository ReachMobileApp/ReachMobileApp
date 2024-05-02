import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  name: string;
  names: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} className='text-[#BB6B0C] mr-3'>
        {props.name}
      </Text>
      <Text style={styles.text} className='text-white'>
        {props.names}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 15,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default Header;
