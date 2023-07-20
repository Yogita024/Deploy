
import { AppBar, Toolbar, Box,InputBase,styled } from '@mui/material';
import { Menu as MenuIcon, Tune, Search, HelpOutlineOutlined,SettingsOutlined,AppsOutlined,AccountCircleOutlined } from '@mui/icons-material'

import { gmailLogo } from '../constants/constant'
const StyledAppBar = styled(AppBar)(
    {
        background: '#f5F5F5',
        boxShadow: 'none',
      

    } 
);

const SearchWrapper = styled(Box)(
    {
        background:'#EAF1FB',
        marginLeft:80,
        borderRadius: 24,
        minWidth:600,
        maxWidth:690,
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        '&> div':{
            width:'100%',
            

        }
        }
    
)
 
const OptionWrapper =styled(Box)
(

{
    width:'100%',
    display: 'flex',
    justifyContent: 'end',
  
    '& > svg': {
        marginLeft: '20px',
    }

}
)

const Header = ( {toggleDrawer} ) => {

    return (
        <StyledAppBar position="static">
            <Toolbar> 
                 <MenuIcon color="action"  onClick={toggleDrawer}/>
                <img src={gmailLogo} alt="logo" style={{ width: 110, marginLeft: 15 }} />
                <SearchWrapper>
                    <Search color="action" />
                    <InputBase
                    placeholder='Search mail' />

                    <Tune  color="action"/>
                    </SearchWrapper> 
                <OptionWrapper>
                    <HelpOutlineOutlined color="action"></HelpOutlineOutlined>
                    <SettingsOutlined color="action"></SettingsOutlined>
                    <AppsOutlined color="action"></AppsOutlined>
                    <AccountCircleOutlined color="action"></AccountCircleOutlined>
                </OptionWrapper>

                </Toolbar>
        </StyledAppBar>
    )
}
export default Header;