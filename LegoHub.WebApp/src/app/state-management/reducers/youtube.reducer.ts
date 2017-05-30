import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { YoutubeActions } from '../actions';

export interface YoutubeState 
{
    channels: YoutubeChannelResponse[];
    videos: YoutubeVideoResponse[];
    loading: boolean;
};

const initialState: YoutubeState = {
    channels: [],
    videos: [],
    loading: false
};

export function reducer(state = initialState, action: Action): YoutubeState {
    switch (action.type) {
        case YoutubeActions.GET_FEATURED_VIDEOS: {
            return Object.assign({}, state, {loading: true});
        }

        case YoutubeActions.GET_FEATURED_VIDEOS_SUCCESS: {
            let result = action.payload;
            return Object.assign({}, state, <YoutubeState>{channels: result.channels, videos: result.videos, loading: false});
        }

        case YoutubeActions.GET_VIDEOS_BY_QUERY: {
            return Object.assign({}, state, {saving: true});
        }

        case YoutubeActions.GET_VIDEOS_BY_QUERY_SUCCESS: {
            return Object.assign({}, state, {saving: false});
        }
        
        default: {
            return state;
        }
    }
}