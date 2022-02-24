import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';

export interface IUseMediaProps extends MediaLibrary.AssetsOptions {
  autoload?: boolean; // when true loads first set of assets on load.
}

export interface IMediaInfo extends MediaLibrary.PagedInfo<MediaLibrary.Asset> {
  initialized?: boolean; // has loaded first page/dataset.
  completed?: boolean; // all data loaded.
}

const DEFAULTS: MediaLibrary.AssetsOptions = {
  sortBy: ['creationTime'],
  mediaType: ['photo', 'video'],
};

const useMedia = (props = {} as IUseMediaProps) => {

  props = {
    autoload: true,
    ...props
  };

  const { autoload, ...rest } = props;

  const [info, setInfo] =
    useState({ initialized: false, completed: false } as IMediaInfo);

  const initOptions = { ...DEFAULTS, ...rest };

  useEffect(() => {
    if (autoload) load();
  }, []);

  async function getAssetInfo(asset: MediaLibrary.Asset) {
    const result = await MediaLibrary.getAssetInfoAsync(asset);
    return result;
  }

  async function getLibraryInfo(options: MediaLibrary.AssetsOptions) {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted')
      return;
    return await MediaLibrary.getAssetsAsync(options);
  }

  function setMediaInfo(mediaInfo: IMediaInfo) {
    if (!mediaInfo)
      return setInfo({ ...info, initialized: true, completed: true, hasNextPage: false });
    setInfo({ initialized: info?.initialized, completed: info?.completed, ...mediaInfo });
  }

  async function load() {
    let itemsLoaded = 0;
    const mediaInfo = await getLibraryInfo(initOptions) as IMediaInfo;
    if (mediaInfo?.assets)
      itemsLoaded = mediaInfo.assets.length;
    setMediaInfo({ initialized: true, completed: false, ...mediaInfo });
    return itemsLoaded;
  }

  async function next() {
    let itemsLoaded = 0;
    if (info?.hasNextPage && info?.completed !== true) {
      const nextOptions = { ...initOptions, after: info.endCursor };
      const mediaInfo = await getLibraryInfo(nextOptions);
      if (mediaInfo) {
        itemsLoaded = mediaInfo.assets.length;
        mediaInfo.assets = [...info.assets, ...mediaInfo.assets];
        setMediaInfo(mediaInfo);
      }
    }
    return itemsLoaded;
  }

  return {
    ...info,
    getAssetInfo,
    load,
    next
  }

};

export default useMedia;