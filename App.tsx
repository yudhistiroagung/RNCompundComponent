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
        {/** putting View component inside product detail will show warning on console
         * and this View will not be rendered
         */}
        <View />
        <ProductDetail.Image />
        <ProductDetail.Name style={{ color: '#333333' }} />
        <ProductDetail.Rating />
        <ProductDetail.Price />
        <ProductDetail.Description />
      </ProductDetail>
      <Spacer />
      <ProductDetail product={remoteControl}>
        {/** notice that we put ProductDetail.Name, only the first one will be rendered
         * this is also shows warning on console
         */}
        <ProductDetail.Name style={{ color: 'red' }} />
        <ProductDetail.Name />
        {/* still render image on top eventhough we put it in the last order */}
        <ProductDetail.Image />
        <ProductDetail.Rating />
        <ProductDetail.Price />
        <ProductDetail.Description />
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
