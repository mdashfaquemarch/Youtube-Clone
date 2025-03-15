import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiResponse} from '../utils/ApiResponse.js'

import {SearchService} from '../services/index.js'
import { StatusCodes } from 'http-status-codes';

const searchService = new SearchService();

/*
    seaching -
        - it searches -> user videos playlists
        - pagination  -> page limit
*/

const search = asyncHandler( async (req, res) => {
    const {page = 1, limit = 20 , query } =  req.query;

    // Convert `page` & `limit` to numbers and validate them
    const pageNumber = Math.max(parseInt(page, 10), 1) || 1;
    const limitNumber = Math.max(parseInt(limit, 10), 1) || 10;

    const {results, pagination} = await searchService.search(pageNumber, limitNumber, query);

    
    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        {
           results,
           pagination
        },
        "Searching done successfully"
    ))
}) 


export {search};


