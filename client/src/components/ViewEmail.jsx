

import { Box, Typography, styled } from '@mui/material';
import { useOutletContext, useLocation } from 'react-router-dom';
import { emptyProfilePic } from '../constants/constant';
import { ArrowBack, Delete } from '@mui/icons-material';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.url';

const IconWrapper = styled(Box)({
    padding: 15
});

const Subject = styled(Typography)({
    fontSize: 22,
    margin: '10px 0 20px 75px',
    display: 'flex'
})

const Indicator = styled(Box)(
    {
        fontSize: '12px !important',
        background: '#ddd',
        color: '#222',
        borderRadius: '4px',
        marginLeft: '6px',
        padding: '2px 4px',
        alignSelf: 'center'

    }
)



const Image = styled('img')({
    borderRadius: '50%',
    width: 40,
    height: 40,
    margin: '5px 10px 0 10px',
    backgroundColor: '#cccccc'
});

const Container = styled(Box)({
    marginLeft: 15,
    width: '100%',
    '& > div': {
        display: 'flex',
        '& > p > span': {
            fontSize: 12,
            color: '#5E5E5E'
        }
    }
});
const EmailDate = styled(Typography)({
    margin: '0 50px 0 auto',
    fontSize: 12,
    color: '#5E5E5E',
});

const ViewEmail = () => {

    const { openDrawer } = useOutletContext();

    const { state } = useLocation();
    const { email } = state;
    const moveEmailsToBinService = useApi(API_URLS.moveEmailsToBin);

    const deleteEmail = () => {
        moveEmailsToBinService.call([email._id]);
        window.history.back();
    }

    return (
        <Box style={openDrawer ? { marginLeft: 250 } : { width: '100%' }}>
            <IconWrapper>
                <ArrowBack fontSize='small' color="action" onClick={() => window.history.back()} />
                <Delete fontSize='small' color="action" style={{ marginLeft: 40 }} onClick={() => deleteEmail()} />
            </IconWrapper>
            <Subject>{email.subject} <Indicator component="span">Inbox</Indicator>
            </Subject>
            <Box style={{ display: 'flex' }}>
                <Image src={emptyProfilePic} alt="profile" />
                <Container>
                    <Box>
                        <Typography style={{ marginTop: '10px' }}>
                            {email.name}

                            <Box component="span">&nbsp;&#60;{email.to}&#62;</Box>
                        </Typography>

                        <EmailDate>
                            {new Date(email.date).toLocaleDateString([], {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })},{" "}
                            {new Date(email.date).toLocaleTimeString([], {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                            })}
                        </EmailDate>

                    </Box>
                    <Typography style={{ marginTop: 20 }}>{email.body}</Typography>
                </Container>
            </Box>
        </Box>
    )
}

export default ViewEmail;