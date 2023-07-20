import axios from  'axios';

const API_URI ='';
const API_GMAIL =async(urlObject,payload,type) =>
{
   return axios(
        {
               method:urlObject.method,
               url:  API_URI + '/' + urlObject.endpoint +'/' +type,
               data: payload
          }
    )
}
export default API_GMAIL;