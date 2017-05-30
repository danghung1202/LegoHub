/*
 * Custom Type Definitions
 * When including 3rd party modules you also need to include the type definition for the module
 * if they don't provide one within the module. You can try to install it with @types

npm install @types/node
npm install @types/lodash

 * If you can't find the type definition in the registry we can make an ambient/global definition in
 * this file for now. For example

declare module 'my-module' {
 export function doesSomething(value: string): string;
}

 * If you are using a CommonJS module that is using module.exports then you will have to write your
 * types using export = yourObjectOrFunction with a namespace above it
 * notice how we have to create a namespace that is equal to the function we're
 * assigning the export to

declare module 'jwt-decode' {
  function jwtDecode(token: string): any;
  namespace jwtDecode {}
  export = jwtDecode;
}

 *
 * If you're prototying and you will fix the types later you can also declare it as type any
 *

declare var assert: any;
declare var _: any;
declare var $: any;

 *
 * If you're importing a module that uses Node.js modules which are CommonJS you need to import as
 * in the files such as main.browser.ts or any file within app/
 *

import * as _ from 'lodash'

 * You can include your type definitions in this file until you create one for the @types
 *
 */

// support NodeJS modules without type definitions
declare module '*';

/*
// for legacy tslint etc to understand rename 'modern-lru' with your package
// then comment out `declare module '*';`. For each new module copy/paste
// this method of creating an `any` module type definition
declare module 'modern-lru' {
  let x: any;
  export = x;
}
*/

// Extra variables that live on Global that will be replaced by webpack DefinePlugin
declare var ENV: string;
declare var HMR: boolean;
declare var System: SystemJS;

interface SystemJS {
  import: (path?: string) => Promise<any>;
}

interface GlobalEnvironment {
  ENV: string;
  HMR: boolean;
  SystemJS: SystemJS;
  System: SystemJS;
}

interface Es6PromiseLoader {
  (id: string): (exportName?: string) => Promise<any>;
}

type FactoryEs6PromiseLoader = () => Es6PromiseLoader;
type FactoryPromise = () => Promise<any>;

type AsyncRoutes = {
  [component: string]: Es6PromiseLoader |
  Function |
  FactoryEs6PromiseLoader |
  FactoryPromise
};

type IdleCallbacks = Es6PromiseLoader |
  Function |
  FactoryEs6PromiseLoader |
  FactoryPromise;

interface WebpackModule {
  hot: {
    data?: any,
    idle: any,
    accept(dependencies?: string | string[], callback?: (updatedDependencies?: any) => void): void;
    decline(deps?: any | string | string[]): void;
    dispose(callback?: (data?: any) => void): void;
    addDisposeHandler(callback?: (data?: any) => void): void;
    removeDisposeHandler(callback?: (data?: any) => void): void;
    check(autoApply?: any, callback?: (err?: Error, outdatedModules?: any[]) => void): void;
    apply(options?: any, callback?: (err?: Error, outdatedModules?: any[]) => void): void;
    status(callback?: (status?: string) => void): void | string;
    removeStatusHandler(callback?: (status?: string) => void): void;
  };
}

interface WebpackRequire {
  (id: string): any;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure(ids: string[], callback: (req: WebpackRequire) => void, chunkName?: string): void;
  context(directory: string, useSubDirectories?: boolean, regExp?: RegExp): WebpackContext;
}

interface WebpackContext extends WebpackRequire {
  keys(): string[];
}

interface ErrorStackTraceLimit {
  stackTraceLimit: number;
}

// Extend typings
interface NodeRequire extends WebpackRequire { }
interface ErrorConstructor extends ErrorStackTraceLimit { }
interface NodeRequireFunction extends Es6PromiseLoader { }
interface NodeModule extends WebpackModule { }
interface Global extends GlobalEnvironment { }

interface YoutubeChannel {
  id: string;
  name: string;
}

interface YoutubeConfig {
  apiKey: string;
  keyword: string;
  channels: Array<YoutubeChannel>;
}

interface PinterestBoard {
  id?: string;
  name?: string;
  href?: string;
  cursor?: string;
}

interface PinterestUser {
  id?: string;
  username?: string;
  boards?: Array<PinterestBoard>;
}

interface PinterestConfig {
  token: string;
  users: Array<PinterestUser>;
}

interface YoutubeChannelsRequestParameter {
  /**
   * The part parameter specifies a comma-separated list of one or more channel resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, contentDetails, statistics, topicDetails, and invideoPromotion. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a channel resource, the contentDetails property contains other properties, such as the uploads properties. As such, if you set part=contentDetails, the API response will also contain all of those nested properties.
   */
  part?: string;
  /**
   * The categoryId parameter specifies a YouTube guide category, thereby requesting YouTube channels associated with that category.
   */
  categoryId?: string;
  /**
   * The forUsername parameter specifies a YouTube username, thereby requesting the channel associated with that username.
   */
  forUsername?: string;
  /**
   * The id parameter specifies a comma-separated list of the YouTube channel ID(s) for the resource(s) that are being retrieved. In a channel resource, the id property specifies the channel's YouTube channel ID.
   */
  id?: string;
  /**
   * Set this parameter's value to true to instruct the API to only return channels managed by the content owner that the onBehalfOfContentOwner parameter specifies. The user must be authenticated as a CMS account linked to the specified content owner and onBehalfOfContentOwner must be provided.
   */
  managedByMe?: boolean;
  /**
   * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults?: number;
  /**
   * Set this parameter's value to true to instruct the API to only return channels owned by the authenticated user.
   */
  mine?: boolean;
  /**
   * Set this parameter's value to true to retrieve a list of channels that subscribed to the authenticated user's channel.
   */
  mySubscribers?: boolean;
  /**
   * The onBehalfOfContentOwner parameter indicates that the authenticated user is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with needs to be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The pageToken parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved.
   */
  pageToken?: string;
}

interface YoutubeSearchRequestParameter {
  /**
   * The part parameter specifies a comma-separated list of one or more search resource properties that the API response will include. The part names that you can include in the parameter value are id and snippet. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a search result, the snippet property contains other properties that identify the result's title, description, and so forth. If you set part=snippet, the API response will also contain all of those nested properties.
   */
  part?: string;
  /**
   * The channelId parameter indicates that the API response should only contain resources created by the channel
   */
  channelId?: string;
  /**
   * The channelType parameter lets you restrict a search to a particular type of channel.
   */
  channelType?: string;
  /**
   * The forContentOwner parameter restricts the search to only retrieve resources owned by the content owner specified by the onBehalfOfContentOwner parameter. The user must be authenticated as a CMS account linked to the specified content owner and onBehalfOfContentOwner must be provided.
   */
  forContentOwner?: boolean;
  /**
   * The forMine parameter restricts the search to only retrieve videos owned by the authenticated user.
   */
  forMine?: boolean;
  /**
   * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults?: number;
  /**
   * The onBehalfOfContentOwner parameter indicates that the authenticated user is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with needs to be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The order parameter specifies the method that will be used to order resources in the API response.
   */
  order?: string;
  /**
   * The pageToken parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The publishedAfter parameter indicates that the API response should only contain resources created after the specified time. The value is an RFC 3339 formatted date-time value (1970-01-01T00:00:00Z).
   */
  publishedAfter?: string;
  /**
   * The publishedBefore parameter indicates that the API response should only contain resources created before the specified time. The value is an RFC 3339 formatted date-time value (1970-01-01T00:00:00Z).
   */
  publishedBefore?: string;
  /**
   * The q parameter specifies the query term to search for.
   */
  q?: string;
  /**
   * The regionCode parameter instructs the API to return search results for the specified country. The parameter value is an ISO 3166-1 alpha-2 country code.
   */
  regionCode?: string;
  /**
   * The relatedToVideoId parameter retrieves a list of videos that are related to the video that the parameter value identifies. The parameter value must be set to a YouTube video ID and, if you are using this parameter, the type parameter must be set to video.
   */
  relatedToVideoId?: string;
  /**
   * The safeSearch parameter indicates whether the search results should include restricted content as well as standard content.
   */
  safeSearch?: string;
  /**
   * The topicId parameter indicates that the API response should only contain resources associated with the specified topic. The value identifies a Freebase topic ID.
   */
  topicId?: string;
  /**
   * The type parameter restricts a search query to only retrieve a particular type of resource.
   */
  type?: string;
  /**
   * The videoCaption parameter indicates whether the API should filter video search results based on whether they have captions.
   */
  videoCaption?: string;
  /**
   * The videoCategoryId parameter filters video search results based on their category.
   */
  videoCategoryId?: string;
  /**
   * The videoDefinition parameter lets you restrict a search to only include either high definition (HD) or standard definition (SD) videos. HD videos are available for playback in at least 720p, though higher resolutions, like 1080p, might also be available.
   */
  videoDefinition?: string;
  /**
   * The videoDimension parameter lets you restrict a search to only retrieve 2D or 3D videos.
   */
  videoDimension?: string;
  /**
   * The videoDuration parameter filters video search results based on their duration.
   */
  videoDuration?: string;
  /**
   * The videoEmbeddable parameter lets you to restrict a search to only videos that can be embedded into a webpage.
   */
  videoEmbeddable?: string;
  /**
   * The videoLicense parameter filters search results to only include videos with a particular license. YouTube lets video uploaders choose to attach either the Creative Commons license or the standard YouTube license to each of their videos.
   */
  videoLicense?: string;
  /**
   * The videoSyndicated parameter lets you to restrict a search to only videos that can be played outside youtube.com.
   */
  videoSyndicated?: string;
  /**
   * The videoType parameter lets you restrict a search to a particular type of videos.
   */
  videoType?: string;
}

interface YoutubeVideosListParameter {
  part?: string;
  /**
   * Set this parameter's value to mostPopular to instruct the API to return videos belonging to the chart of most popular videos.
   */
  chart: string;
  /**
   * The id parameter specifies a comma-separated list of the YouTube video ID(s) for the resource(s) that are being retrieved. In a video resource, the id property specifies the video's ID.
   */
  id: string;
  /**
   * The locale parameter selects a video chart available in the specified locale. If using this parameter, chart must also be set. The parameter value is an BCP 47 locale. Supported locales include ar_AE, ar_DZ, ar_EG, ar_JO, ar_MA, ar_SA, ar_TN, ar_YE, cs_CZ, de_DE, el_GR, en_AU, en_BE, en_CA, en_GB, en_GH, en_IE, en_IL, en_IN, en_KE, en_NG, en_NZ, en_SG, en_UG, en_US, en_ZA, es_AR, es_CL, es_CO, es_ES, es_MX, es_PE, fil_PH, fr_FR, hu_HU, id_ID, it_IT, ja_JP, ko_KR, ms_MY, nl_NL, pl_PL, pt_BR, ru_RU, sv_SE, tr_TR, zh_HK, zh_TW
   */
  locale: string;
  /**
   * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults: number;
  /**
   * Set this parameter's value to like or dislike to instruct the API to only return videos liked or disliked by the authenticated user.
   */
  myRating: string;
  /**
   * The onBehalfOfContentOwner parameter indicates that the authenticated user is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with needs to be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner: string;
  /**
   * The pageToken parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved.
   */
  pageToken: string;
  /**
   * The videoCategoryId parameter selects a video chart based on the category. If using this parameter, chart must also be set.
   */
  videoCategoryId: string;
}

interface YoutubePlaylistsListParameter {
  /**
   * The part parameter specifies a comma-separated list of one or more playlist resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, and status. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a playlist resource, the snippet property contains properties like author, title, description, tags, and timeCreated. As such, if you set part=snippet, the API response will contain all of those properties.
   */
  part?: string;
  /**
   * This value indicates that the API should only return the specified channel's playlists.
   */
  channelId?: string;
  /**
   * The id parameter specifies a comma-separated list of the YouTube playlist ID(s) for the resource(s) that are being retrieved. In a playlist resource, the id property specifies the playlist's YouTube playlist ID.
   */
  id?: string;
  /**
   * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults?: number;
  /**
   * Set this parameter's value to true to instruct the API to only return playlists owned by the authenticated user.
   */
  mine?: boolean;
  /**
   * The pageToken parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved.
   */
  pagetoken: string;
}

interface YoutubePlaylistItemsListParameter {
  /**
   * The part parameter specifies a comma-separated list of one or more playlistItem resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, and contentDetails. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a playlistItem resource, the snippet property contains numerous fields, including the title, description, position, and resourceId properties. As such, if you set part=snippet, the API response will contain all of those properties.
  */
  part?: string;
  /**
   * The id parameter specifies a comma-separated list of one or more unique playlist item IDs.
   */
  id?: string;
  /**
   * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults?: number;
  /**
   * The pageToken parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The playlistId parameter specifies the unique ID of the playlist for which you want to retrieve playlist items. Note that even though this is an optional parameter, every request to retrieve playlist items must specify a value for either the id parameter or the playlistId parameter.
   */
  playlistId?: string;
  /**
   * The videoId parameter specifies that the request should return only the playlist items that contain the specified video.
   */
  videoId?: string;
}

interface YoutubeChannelResponse {
  id: string;
  uploadsId?: string;
  title?: string;
  description?: string;
  videoCount?: number;
  thumbnail?: string;
}

interface YoutubeVideoResponse {
  id: string;
  title?: string;
  description?: string;
  viewCount?: number;
  channel?: string;
  thumbnail?: string;
}

interface YoutubeResponseWrapper {
  videos: YoutubeVideoResponse[];
  channels: YoutubeChannelResponse[];
}

interface PinterestRequestParameter {
  access_token?: string;
  fields?: string;
  limit?: number;
  cursor?: string;
  callback?: string;
}

interface PinterestBoard {
  id?: string;
  name?: string;
  url?: string;
}

interface PinCreator {
  url?: string;
  first_name?: string;
  last_name?: string;
  id?: string;
}

interface PinterestImage {
  url?: string;
  width?: string;
  height?: string;
}

interface PinImage {
  original?: PinterestImage;
}

interface ArticleMetadata {
  published_at?: string;
  description?: string;
  name?: string;
  authors?: Array<any>;
}

interface LinkMetadata {
  locale?: string;
  title?: string;
  site_name?: string;
  description?: string;
  favicon?: string;
}

interface PinMetadata {
  article?: ArticleMetadata;
  link?: LinkMetadata;
}

interface Pin {
  id?: string;
  link?: string;
  original_link?: string;
  url?: string;
  creator?: PinCreator;
  board?: PinterestBoard;
  created_at?: string;
  note?: string;
  color?: string;
  image?: PinImage;
  metadata?: PinMetadata;
}

interface PinterestPage {
  cursor?: string;
  next?: string;
}

interface PinterestPinsListResponse {
  data?: Pin[];
  page?: PinterestPage;
}



