import { useState } from "react";
import { Dialog,Box,Typography,styled,InputBase,TextField,Button} from "@mui/material";
import { Close,DeleteOutline} from "@mui/icons-material";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.url";
const dialogStyle={
    height:'90%',
    width:'80%',
    maxWidth:'100%',
    maxHeight:'100%',
    boxShadow:'none',
     borderRadius:'10px 10px 0 0'

}
 const Header =styled(Box)(
    {
        display:'flex',
        justifyContent:'space-between',
        padding: '10px 15px',
        background :'#f2f6fc',
        '& >p':
        {
            fontSize:14,
            fontWeight:500
        }
    }
 )
 const RecipientWrapper = styled(Box)(
    {
        display: 'flex',
       flexDirection: 'column',
      padding:' 0 15px',
    '& > div': {
        fontSize: '14px',
        borderBottom: '1px solid #F5F5F5',
        marginTop: '10px'
    }
    }
 )

 const Footer  = styled(Box)(
    {
        display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
    alignItems: 'center'
    }
 )

 const SendButton = styled(Button)(
    {
        background: '#0B57D0',
        color: '#fff',
        fontWeight: 500,
        textTransform: 'none',
        borderRadius: '18px',
        width: '100px'
    }
 )
   
const ComposeMail = ({openDialog,setOpenDialog}) =>
{   
    const [Data,setData]=useState({});
    const sentEmailservice=useApi(API_URLS.savesentEmail);
    const saveDraftService=useApi(API_URLS.saveDraftEmails);
    const config={
       
        Username :"xyz@gmail.com",
        Password :"1234",
        Host : "smtp.elasticemail.com",
        Port: 2525
       
    }
    
    const onValueChange=(e)=>{
        setData({ ...Data,[e.target.name]:e.target.value});
        console.log(Data);
     }
     const closeComposeMail = (e) =>{
        e.preventDefault();
        const payload={
            to: Data.to,
            from: "xyz@gmail.com",
            subject:  Data.subject,
            body:  Data.body,
            date: new Date(),
            image: '',
            name: 'Yogita',
            starred  : false,
            type : 'drafts'



        }
        saveDraftService.call(payload);
        if(!saveDraftService.error)
        {
             setOpenDialog(false);
             setData({});
        }
        else
        {

        }
        setOpenDialog(false);
    }
     const sendMail= async(e) =>

     {  
        e.preventDefault();
        if(window.Email)
        {   

        
            window.Email.send({
                ...config,
                To : Data.to,
                From : "xyz@gmail.com",
                Subject : Data.subject,
                Body : Data.body, 
            }).then(
              message => alert(message)
            );
        }

        const payload={
            to: Data.to,
            from: "xyz@gmail.com",
            subject:  Data.subject,
            body:  Data.body,
            date: new Date(),
            image: '',
            name: 'xyz',
            starred  : false,
            type : 'sent'



        }
        sentEmailservice.call(payload);
        if(!sentEmailservice.error)
        {
             setOpenDialog(false);
             setData({});
        }
        else
        {

        }
        setOpenDialog(false);
     }
   
     
   
    return (
        <Dialog
        open={openDialog}
        PaperProps={{sx:dialogStyle}}>
         <Header>
        <Typography>
            New Message
        </Typography>
        <Close fontSize="small" onClick={(e) => closeComposeMail(e)}/>
 

        </Header>
        <RecipientWrapper>
         <InputBase placeholder='Recipients' name="to" onChange={(e) =>onValueChange(e)}/>
        <InputBase placeholder='Subject' name="subject" onChange={(e) =>onValueChange(e)}/>
         </RecipientWrapper>
         
            <TextField
            multiline
            rows={12}
            sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }} name="body" onChange={(e) =>onValueChange(e)}/>
           
            <Footer>
                <SendButton onClick={(e)=> sendMail(e)}>Send</SendButton>
                <DeleteOutline onClick={()=>setOpenDialog(false)}  />
            </Footer>
        </Dialog>
    )
}
export default ComposeMail; 