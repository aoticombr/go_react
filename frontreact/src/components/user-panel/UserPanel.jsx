import React, { useMemo } from 'react';
import { useHistory} from "react-router-dom";
import ContextMenu, { Position } from 'devextreme-react/context-menu';
import List from 'devextreme-react/list';
import {logout} from '../../services/auth';
//import { useAuth } from '../../contexts/auth';
import './UserPanel.scss';
//import type { UserPanelProps } from '../../types';

export default function UserPanel({ menuMode }) {
 // const { user, signOut } = useAuth();
  const navigate = useHistory();

  function navigateToProfile() {
    navigate("/profile");
  }
  async function handLogout() {
    await logout();
    navigate.push('/');
  } 
  const menuItems = useMemo(() => ([
    {
      text: 'Profile',
      icon: 'user',
      onClick: navigateToProfile
    },
    {
      text: 'Logout',
      icon: 'runner',
     onClick: handLogout
    }
  ]), [//signOut
  ]);
  return (
    <div className={'user-panel'}>
      <div className={'user-info'}>
        <div className={'image-container'}>
          <div
            style={{
            // background: `url(${user!.imageUrl}) no-repeat #fff`,
              backgroundSize: 'cover'
            }}
            className={'user-image'} />
        </div>
        {//<div className={'user-name'}>{user!.email}</div>
        }
      </div>

      {menuMode === 'context' && (
        <ContextMenu
          items={menuItems}
          target={'.user-button'}
          showEvent={'dxclick'}
          width={210}
          cssClass={'user-menu'}
        >
          <Position my={'top center'} at={'bottom center'} />
        </ContextMenu>
      )}
      {menuMode === 'list' && (
        <List className={'dx-toolbar-menu-action'} items={menuItems} />
      )}
    </div>
  );
}
