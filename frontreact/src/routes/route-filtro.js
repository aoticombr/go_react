import React, {useState, useCallback,useRef}  from 'react';
import 'devextreme/dist/css/dx.light.css';
import {default as SideNavigationMenu } from '../components/side-navigation-menu/SideNavigationMenu';
import HeaderFilter                           from '../components/headerFilter/Header';
import { Template } from 'devextreme-react/core/template';
import Drawer       from 'devextreme-react/drawer';
import { useScreenSize } from '../utils/media-query';
import { useHistory } from 'react-router';
import { useMenuPatch } from '../utils/patches';
import ScrollView from 'devextreme-react/scroll-view';


const MenuStatus = {
    Closed: 1,
    Opened: 2,
    TemporaryOpened: 3
  };

const RouterMenu = ({ title, children }) => {
  const scrollViewRef = useRef(null);
  const navigate = useHistory(); 
  const { isXSmall, isLarge } = useScreenSize();
 // const [childList, setChildList] = useState(React.Children.toArray(children));
  const [patchCssClass, onMenuReady] = useMenuPatch();
  const [menuStatus, setMenuStatus] = useState(isLarge ? MenuStatus.Opened : MenuStatus.Closed);



  const toggleMenu = useCallback(({ event }) => {
        setMenuStatus(
          prevMenuStatus => prevMenuStatus === MenuStatus.Closed
            ? MenuStatus.Opened
            : MenuStatus.Closed
        );
        event?.stopPropagation();
  }, []);
     
  const temporaryOpenMenu = useCallback(() => {
    setMenuStatus(
        prevMenuStatus => prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.TemporaryOpened
        : prevMenuStatus
    );
  }, []);

  const onOutsideClick = useCallback(() => {
    setMenuStatus(
      prevMenuStatus => prevMenuStatus !== MenuStatus.Closed && !isLarge
        ? MenuStatus.Closed
        : prevMenuStatus
    );
    return true;
  }, [isLarge]);

  const onNavigationChanged = useCallback(({ itemData, event, node }) => {
    if (menuStatus === MenuStatus.Closed || !itemData?.path || node?.selected) {
      event?.preventDefault();
      return;
    }

    navigate.push(itemData.path);
   scrollViewRef.current?.instance.scrollTo(0);

   if (!isLarge || menuStatus === MenuStatus.TemporaryOpened) {
     setMenuStatus(MenuStatus.Closed);
     event?.stopPropagation();
   }
  }, [navigate, menuStatus, isLarge]);

  return (
   < >
    
     <HeaderFilter  
       menuToggleEnabled={isXSmall}  
       toggleMenu={toggleMenu}   
       enabled={menuStatus === MenuStatus.Closed ? false : true}     
       title={'Filtros'}
     />
       <Drawer
                className={['drawer', patchCssClass].join(' ')}
             position={'before'}
               closeOnOutsideClick={onOutsideClick}
             revealMode={isXSmall ? 'slide' : 'expand'}
           //  minSize={isXSmall ? 0 : 60}
             maxSize={250}
             shading={isLarge ? false : true}
             opened={menuStatus === MenuStatus.Closed ? false : true}
             template={'menu2'}
             visible={isXSmall ? false : true} 
            
        >
      
     
          <Template name={'menu2'}    >
            <ScrollView ref={scrollViewRef} className={'layout-body with-footer'}  >
              <div className={'content-block'}>
                {React.Children.map(children, (item) => {return item;})}
              </div>
            </ScrollView>
          </Template>
       </Drawer>    
    </>      
   )
}

export default RouterMenu;
