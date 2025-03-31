
// import React, { useEffect, useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { InputText } from 'primereact/inputtext';
// import { Badge } from 'primereact/badge';
// import { Avatar } from 'primereact/avatar';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { setItemsInTheMenubar } from '../store/reducer/itemsInTheMenubarSlice';
// export default function TemplateDemo() {
//   const dispatch = useDispatch()

//   const itemsInTheMenubar = useSelector(state => state.itemsInTheMenubar.itemsInTheMenubar)
//   const navigate = useNavigate()
//   // const item = [{
//   //     label: 'Login',
//   //     icon: 'pi pi-user',
//   //     to:'/Login'
    
//   //     // command: () => {navigate('./Login') }
//   // }]

//   useEffect(() => {
//     dispatch(setItemsInTheMenubar({ newItems: [{ label: 'New Item', icon: 'pi pi-user', to: '/Login'}] }));
//     // dispatch(setItemsInTheMenubar({newItems:item}))
//   }, [dispatch,itemsInTheMenubar])
// // if(itemsInTheMenubar){
// //   const menuItems=itemsInTheMenubar.map((item)=>({
// //     ...item,
// //     command:()=>navigate(item.to)
// //   }))
// //   console.log('menuItems',menuItems);
// // }
//   return (
//     <div>
//       {/* <Menubar model={items} style={{ borderRadius: '3rem', backgroundImage: 'linear-gradient(to right, var(--bluegray-200 ), var(--bluegray-500))' }}/> */}
//       {itemsInTheMenubar ? <Menubar start={'DIGITAL COURSE'} model={itemsInTheMenubar} /> : <></>}
//     </div>

//   )
// }
// //from every where update the menubar:
// // dispatch(setItemsInTheMenubar({ newItems: [...newItems, { label: 'New Item', to: '/new', command: () => navigate('/new') }] }));

import React, { useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setItemsInTheMenubar } from '../store/reducer/itemsInTheMenubarSlice';

export default function TemplateDemo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use useSelector to get the items from the Redux store
  const itemsInTheMenubar = useSelector(state => state.itemsInTheMenubar.itemsInTheMenubar);

  // Initialize items if they are not set yet, and do this only once
  useEffect(() => {
    // Only dispatch if itemsInTheMenubar is null or empty
    if (!itemsInTheMenubar || itemsInTheMenubar.length === 0) {
      dispatch(setItemsInTheMenubar({
        newItems: [{ label: 'Courses Page', icon: 'pi pi-user', to: '/CoursesPage' }]
      }));
    }
  }, [dispatch, itemsInTheMenubar]); // Only run this effect if the itemsInTheMenubar is null or empty

  // Safely map over itemsInTheMenubar, ensuring it's not null or undefined
  const menuItems = itemsInTheMenubar ? itemsInTheMenubar.map((item) => ({
    ...item,
    command: () => navigate(item.to),
  })) : [];

  return (
    <div>
      {itemsInTheMenubar && itemsInTheMenubar.length > 0 ? (
        <Menubar start={'DIGITAL COURSE'} model={menuItems} />
      ) : (
        <div>Loading menu items...</div> // Display a loading message or fallback UI
      )}
    </div>
  );
}

