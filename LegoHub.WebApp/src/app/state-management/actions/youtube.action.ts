import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class YoutubeActions {
    static GET_FEATURED_VIDEOS = '[Video] Get featured videos';
    getFeaturedVideos(): Action {
        return {
            type: YoutubeActions.GET_FEATURED_VIDEOS,
        };
    }

    static GET_FEATURED_VIDEOS_SUCCESS = '[Video] Get featured videos Success';
    getFeaturedVideosSuccess(results): Action {
        return {
            type: YoutubeActions.GET_FEATURED_VIDEOS_SUCCESS,
            payload: results
        };
    }

    static GET_VIDEOS_BY_QUERY = 'GET_VIDEOS_BY_QUERY';
    getVideosByQuery(query?: string): Action {
        return {
            type: YoutubeActions.GET_VIDEOS_BY_QUERY,
            payload: query
        };
    }

    static GET_VIDEOS_BY_QUERY_SUCCESS = 'GET_VIDEOS_BY_QUERY_SUCCESS';
    getVideosByQuerySucess(results: YoutubeVideoResponse[]): Action {
        return {
            type: YoutubeActions.GET_VIDEOS_BY_QUERY_SUCCESS,
            payload: results
        };
    }


}