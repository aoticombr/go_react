import React, {useState, useCallback,useRef}  from 'react';
import 'devextreme/dist/css/dx.light.css';
import {default as SideNavigationMenu } from '../components/side-navigation-menu/SideNavigationMenu';
import Header                           from '../components/header/Header';
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

  // const removeChild = (index) => {
  //   if (childList[index]) { // Verifica se o nó filho ainda pertence ao nó pai
  //     const newChildList = [...childList];
  //     newChildList.splice(index, 1);
  //     setChildList(newChildList);
  //   }
  // };


  return (
    
   <>
    <Header  
      menuToggleEnabled//={isXSmall}  
      toggleMenu={toggleMenu}   
      title={'AOTI'}
    />
    <div className={'side-nav-inner-toolbar'}>
    <Drawer
                className={['drawer', patchCssClass].join(' ')}
             position={'before'}
               closeOnOutsideClick={onOutsideClick}
             openedStateMode={isLarge ? 'shrink' : 'push'}
             revealMode={isXSmall ? 'slide' : 'expand'}
             minSize={isXSmall ? 0 : 60}
             maxSize={250}
             shading={isLarge ? false : true}
             opened={menuStatus === MenuStatus.Closed ? false : true}
             template={'menu'}
    >
      <ScrollView ref={scrollViewRef} className={'layout-body with-footer'}>
     
      
             
      <div className={'content-block'}>
              {React.Children.map(children, (item) => {
                return item;
              })}
            </div>
      </ScrollView>
     
     <Template name={'menu'}       >
       
       
       <SideNavigationMenu
         compactMode={menuStatus === MenuStatus.Closed}
         selectedItemChanged={onNavigationChanged}
         openMenu={temporaryOpenMenu}
        // onMenuReady={onMenuReady}
       >
       </SideNavigationMenu>
     </Template>
     </Drawer>
     </div>
     </>
      
   )
}

export default RouterMenu;
