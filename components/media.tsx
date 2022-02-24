import { FlatList, ListRenderItemInfo } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import withTheme from '../theme/withTheme';
import useMedia from '../hooks/useMedia';
import { useRef } from 'react';
import useDimensions from '../hooks/useDimensions';
import View from './elments/view';
import Image from './elments/image';

export type Asset = MediaLibrary.Asset;

export interface IMediaComponentProps {
  columns?: number;
  pageSize?: number;
  margin?: number;
  size?: number;
  scrollThreshold?: number;
  showFilters?: boolean;
  onSelected?: (item: MediaLibrary.Asset, items: MediaLibrary.Asset[], index?: number) => void;
}

export type OnEndHandler = ((info: {
  distanceFromEnd: number;
}) => void) | null | undefined;

const MediaComponent = withTheme<IMediaComponentProps>((props) => {

  props = {
    columns: 3,
    margin: 8,
    pageSize: 6,
    scrollThreshold: 40,
    ...props
  };

  const { screen } = useDimensions();
  const adjustedColumns = Math.max(0, props.columns as number);
  const adjustedWidth = screen.width - (adjustedColumns * (props.margin as number));
  props.size = adjustedWidth / (props.columns as number);

  const { margin, pageSize, columns, size, scrollThreshold, onSelected } = props;

  const listRef = useRef<FlatList<MediaLibrary.Asset> | null>(null);
  const media = useMedia({ first: pageSize });

  const keyExtractor = (item: MediaLibrary.Asset) => item.id;
  const renderItem = (itemProps: ListRenderItemInfo<MediaLibrary.Asset>) => {
    const { index, item } = itemProps;
    return (
      <Image
        source={{ uri: item.uri }}
        onPress={() => {
          if (onSelected)
            onSelected(item, media.assets, index)
        }}
        style={{
          resizeMode: 'cover',
          width: size,
          height: size
        }}
      />
    );
  };

  return (
    <View style={{ marginTop: margin }}>
      <FlatList
        ref={listRef}
        style={{ flexGrow: 1 }}
        numColumns={columns}
        data={media?.assets}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        columnWrapperStyle={{ justifyContent: 'space-around', marginBottom: margin }}
        showsHorizontalScrollIndicator={false}
        onEndReached={() => {
          media.next();
        }}
        onEndReachedThreshold={scrollThreshold}
      />
    </View>
  );

});

export default MediaComponent;