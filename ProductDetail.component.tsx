import React, { createContext, FC, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StyleProp,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { Product } from './Product';

const s = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    elevation: 8,
    shadowColor: '#e5e5e5',
    padding: 16,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
});

const ProductDetailContext = createContext<Product>(null);

interface ProductImageProps {
  style?: StyleProp<ImageStyle>;
}
const ProductImage = ({ style }: ProductImageProps) => {
  const { imageUrl } = useContext(ProductDetailContext);

  return (
    <Image
      style={[style, s.image]}
      source={{ uri: imageUrl }}
      resizeMode="contain"
    />
  );
};

interface ProductNameProps {
  style?: StyleProp<TextStyle | ViewStyle>;
}
const ProductName = ({ style }: ProductNameProps) => {
  const { name } = useContext(ProductDetailContext);

  return <Text style={[style, s.name]}>{name}</Text>;
};

interface ProductPriceProps {
  style?: StyleProp<TextStyle | ViewStyle>;
}
const ProductPrice = ({ style }: ProductPriceProps) => {
  const { price } = useContext(ProductDetailContext);

  return <Text style={[style, s.name]}>{`Rp. ${price}`}</Text>;
};

interface ProductDetailProps {
  product: Product;
  children?: React.ReactNode;
}
const ProductDetail = ({ product, children }: ProductDetailProps) => {
  return (
    <ProductDetailContext.Provider value={product}>
      <View style={s.container}>{children}</View>
    </ProductDetailContext.Provider>
  );
};

ProductDetail.Image = ProductImage;
ProductDetail.Name = ProductName;
ProductDetail.Price = ProductPrice;

export default ProductDetail;
