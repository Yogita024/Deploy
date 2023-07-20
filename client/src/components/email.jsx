import {Box,Typography,Checkbox,styled} from '@mui/material';
import { Star,StarBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { routes } from "../routes/routes";
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.url';
const Wrapper=styled(Box)
(
    {
        padding: '0 0 0 10px',
        background: '#f2f6fc',
        display: 'flex',
        cursor: 'pointer',
        alignItems:'center',
        '& > div': {
            display: 'flex',
            width: '100%'
        },
        '& > div > p': {
            fontSize: '14px'
        }
    }
)
const Indicator = styled(Typography)(
    {
        fontSize: '12px !important',
       background: '#ddd',
      color: '#222',
      borderRadius: '4px',
      marginRight: '6px',
      padding: '0 4px'
    }
)
const Date = styled(Typography)({
    marginLeft: 'auto',
    marginRight: 20,
    fontSize: 12,
    color: '#5F6368'
})
  
const Email=({email,selectedEmails, setRefreshScreen,setSelectedEmails })=>
{  
    const toggleStarredEmailService = useApi(API_URLS.toggleStarredMails);
    const navigate = useNavigate();
    const toggleStarredEmail = () => {
        toggleStarredEmailService.call({ id: email._id, value: !email.starred });
        setRefreshScreen(prevState => !prevState);
    }
    const onValueChange=()=>
    {
        if(selectedEmails.includes(email._id))
        {
            setSelectedEmails(prevState=>prevState.filter(id=> id!=email._id));

        }
        else{
            setSelectedEmails(prevState => [...prevState, email._id]);
        }

    }
    return(
        <Wrapper>
            <Checkbox size="small"
             checked={selectedEmails.includes(email._id)}
             onChange={()=> onValueChange()}
             />
            { 
                email.starred ? 
                    <Star fontSize="small" style={{ marginRight: 10 ,color:'#FCD12A'}} onClick={() => toggleStarredEmail()} />
                : 
                    <StarBorder fontSize="small" style={{ marginRight: 10 }} onClick={() => toggleStarredEmail()} /> 
            }
            <Box onClick={()=> navigate(routes.view.path,{state:{email:email}})}>
            <Typography style={{width:200, overflow : 'hidden'}}>
                {email.name}
            </Typography>
            <Indicator>Inbox</Indicator>
        <Typography> {email.subject} {email.body && '-' } {email.body}</Typography>
        <Date> 
            {
                (new window.Date(email.date)).getDate()
            }
            {
                (new window.Date(email.date)).toLocaleString('default', {month:'long'})
            }
            

        </Date>
        </Box>
            </Wrapper>
    )
}
export default Email;