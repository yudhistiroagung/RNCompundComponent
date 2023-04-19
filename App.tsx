import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import ProductDetail from './ProductDetail.component';
import { droneFVP, remoteControl } from './fixtures';

const Spacer = ({ height = 16 }: { height?: number }) => (
  <View style={{ height }} />
);

export default function App() {
  return (
    <View style={styles.container}>
      <ProductDetail product={droneFVP}>
        <ProductDetail.Image />
        <ProductDetail.Name style={{ color: '#333333' }} />
        <ProductDetail.Price style={{ color: '#333333' }} />
      </ProductDetail>
      <Spacer />
      <ProductDetail product={remoteControl}>
        <ProductDetail.Image />
        <ProductDetail.Name style={{ color: 'red' }} />
      </ProductDetail>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 24,
  },
});
