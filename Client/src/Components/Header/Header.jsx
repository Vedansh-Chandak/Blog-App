import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const Components = styled(AppBar)`
background: pink;
text-colour: #000000;
`
const Container = styled(Toolbar)`
justify-content: center;
& > a {
padding: 20px;
colour: inherit;
text-decoration: none;
}
`
const Header = () => {
    return (
       <Components>
        <Container>
            <Link to="/">HOME</Link>
            <Link to="/about" >ABOUT</Link>
            <Link to="/contact">CONTACT</Link>
            <Link to="/login" >LOGOUT</Link>
        </Container>
       </Components>
    )
}
export default Header;