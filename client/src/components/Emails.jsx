import { useEffect ,useState} from 'react';
import { useOutletContext ,useParams } from "react-router-dom";
import { API_URLS } from "../services/api.url";
import useApi from '../hooks/useApi';
import { Box, Checkbox,List ,ListItem} from '@mui/material';
import{DeleteOutline} from '@mui/icons-material';
import Email from './email';
import NoMails from './common/NoMails';
import { EMPTY_TABS } from '../constants/constant';

const Emails=({})=>
{   
    const [selectedEmails,setSelectedEmails]=useState([]);
    const [refreshScreen,setRefreshScreen]=useState(false);
    const {openDrawer}=useOutletContext();
    const {type}=useParams();
    const getEmailsService = useApi(API_URLS.getEmailFromType);
    const deleteEmailsService = useApi(API_URLS.deleteEmails);
    const moveEmailsToBin = useApi(API_URLS.moveEmailsToBin);
    useEffect(() => {
        getEmailsService.call({}, type);
    }, [type,refreshScreen])

    const selectAllEmails=(e)=>
    {
        if(e.target.checked)
        {
            const emails=getEmailsService?.response?.map(email=>email._id);
            setSelectedEmails(emails);
        }
        else{
            setSelectedEmails([]);
        }
    }

    const deleteSelectedEmails = () => {
        if (type === 'bin') {
            deleteEmailsService.call(selectedEmails);
        } else {
            moveEmailsToBin.call(selectedEmails);
        }
        setRefreshScreen(prevState => !prevState);

    }
    return(
        <Box style={ openDrawer ? { marginLeft: 250, width :'calc(100%-250px)' } : {width:'100%'}}> 
            
        <Box style={{ padding: '5px 10px 0 10px', display: 'flex', alignItems: 'center' }}>
           <Checkbox size="small"  onChange={(e)=>selectAllEmails(e)}/>
           <DeleteOutline onClick={()=> deleteSelectedEmails()}/>
        </Box>
        <Box>

         </Box>
        <List>
            {
                 getEmailsService?.response?.map(email =>(
                    <Email
                    Key={email._id}
                    email={email}
                    selectedEmails={selectedEmails}
                    setRefreshScreen={setRefreshScreen}
                    setSelectedEmails={ setSelectedEmails}
                    />

                ))
            }
        </List>
        {
            getEmailsService?.response?.length ===0 &&
            <NoMails message={EMPTY_TABS[type]}/>
        }
 
        </Box>
        
    )
}
export default Emails;