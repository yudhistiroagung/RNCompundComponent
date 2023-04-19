import React, {
  createContext,
  useContext,
  FunctionComponent,
  useMemo,
} from 'react';
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
  namePriceContaner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: 'normal',
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#999999',
    lineHeight: 18,
  },
});
// ================= UTILS =============================
const findSingleComponent = (
  childrenArray: React.ReactNode[],
  component: FunctionComponent
) => {
  const filtered = childrenArray.filter((child: React.ReactNode) => {
    if (!React.isValidElement(child)) return false;

    return child.type === component;
  });

  const count = filtered.length;

  if (count > 1) {
    console.warn(
      `Found multiple components of ${component.name}, will only render the first one.`
    );
  }

  return count > 0 && filtered[0];
};

const warnInvalidChildrenComponent = (
  component: FunctionComponent,
  childrenArray: React.ReactNode[],
  components: FunctionComponent[]
) => {
  childrenArray.forEach((child: React.ReactNode) => {
    if (React.isValidElement(child)) {
      const comp = child.type as FunctionComponent;
      if (!components.includes(comp))
        console.warn(
          `${
            comp.name || comp.displayName
          } is not a valid children component of ${component.name}`
        );
    }
  });
};

// ================= END UTILS =============================

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

interface ProductDescriptionProps {
  style?: StyleProp<TextStyle | ViewStyle>;
}
const ProductDescription = ({ style }: ProductDescriptionProps) => {
  const { description } = useContext(ProductDetailContext);

  return <Text style={[style, s.description]}>{description}</Text>;
};

interface ProductPriceProps {
  style?: StyleProp<TextStyle | ViewStyle>;
}
const ProductPrice = ({ style }: ProductPriceProps) => {
  const { price } = useContext(ProductDetailContext);

  return <Text style={[style, s.price]}>{`Rp. ${price}`}</Text>;
};

const ProductRating = () => {
  const { rating } = useContext(ProductDetailContext);

  return <Text>{`⭐ ${rating}`}</Text>;
};

const ALLOWED_COMPONENTS: FunctionComponent[] = [
  ProductImage,
  ProductName,
  ProductPrice,
  ProductRating,
  ProductDescription,
];

interface ProductDetailProps {
  product: Product;
  children?: React.ReactNode;
}
const ProductDetail = ({ product, children }: ProductDetailProps) => {
  const childArray = React.Children.toArray(children);

  warnInvalidChildrenComponent(ProductDetail, childArray, ALLOWED_COMPONENTS);

  const image = useMemo(
    () => findSingleComponent(childArray, ProductImage),
    [childArray]
  );

  const name = useMemo(
    () => findSingleComponent(childArray, ProductName),
    [childArray]
  );

  const price = useMemo(
    () => findSingleComponent(childArray, ProductPrice),
    [childArray]
  );

  const rating = useMemo(
    () => findSingleComponent(childArray, ProductRating),
    [childArray]
  );

  const description = useMemo(
    () => findSingleComponent(childArray, ProductDescription),
    [childArray]
  );

  return (
    <ProductDetailContext.Provider value={product}>
      <View style={s.container}>
        <React.Fragment>
          {image}
          <View style={s.namePriceContaner}>
            {name}
            {rating}
          </View>
          {price}
          {description}
        </React.Fragment>
      </View>
    </ProductDetailContext.Provider>
  );
};

ProductDetail.Image = ProductImage;
ProductDetail.Name = ProductName;
ProductDetail.Price = ProductPrice;
ProductDetail.Rating = ProductRating;
ProductDetail.Description = ProductDescription;

export default ProductDetail;
