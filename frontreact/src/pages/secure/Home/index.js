import React from 'react';
import Header from '../../../shared/header';
import {PageContent} from '../../../shared/styles';
import {Container} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import Cards from "../../../components/Cards/Cards";
import InfoBox from "../../../components/InfoBox/InfoBox";
import SmallBox from "../../../components/SmallBox/SmallBox";
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { UpdatesData, SidebarData } from "../../../Data/Data";

let dados = [];
class Home extends React.Component {
  constructor() {
    super();
    this.state = {  };
  }
   
  async componentDidMount() {
  }

  
   
 

  render () {
    return (
        <>
            <PageContent>
            <Container>
            </Container>
            </PageContent>
        </>
    )  
    
  }
    
    
}

export default withRouter(Home);
