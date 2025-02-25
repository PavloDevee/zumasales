import React, { createContext, useEffect, useState } from 'react';
import { Inspection, IProps, IState, Role, User } from './types';
import { getUserToLocalStorage } from '@/helpers/localStore';
import { useCookies } from 'react-cookie';
import { child, get, onValue, ref } from 'firebase/database';
import { toast } from 'react-toastify';
import { database } from '@/firebase/firebase';
import { objModify, objModifyAll } from './helpers/modifications';
import { endpoint } from '@/firebase/endpoint';

export const DataProvider = createContext<IState>({
  userState: [],
  setUserState: () => { },
  cookies: {},
  setCookie: () => { },
  removeCookie: () => { },
  data: [],
  setData: () => { },
  users: [],
  setUsers: () => { },
  userRole: Role.User,
});

export const MyDataProvider: React.FC<IProps> = ({ children }) => {
  const [userState, setUserState] = useState<User[]>([getUserToLocalStorage()]);
  const [cookies, setCookie, removeCookie] = useCookies(['idToken']);
  const [data, setData] = useState<Inspection[]>([]);
  const [userRole, setUserRole] = useState(Role.User);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (userState.length) {
      const dbRef = ref(database);
      get(child(dbRef, endpoint.getUser(userState[0].uid))).then((snapshot) => {
        if (snapshot.exists()) {
          setUserRole(snapshot.val().role);
          if (userRole === Role.Admin || userRole === Role.Moderator) {
            getAllData();
          } else {
            getData();
          }
        }
      }).catch((error) => {
        toast.error(error);
      });
    }
  }, [userState, userRole])

  const getAllData = () => {
    const starCountRef = ref(database, endpoint.getAllUsers);
    onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(objModifyAll(snapshot.val()));
        setUsers(objModify(snapshot.val()));
      } else {
        toast.error("No data available");
      }
    });
  }

  const getData = () => {
    const starCountRef = ref(database, endpoint.getUser(userState[0].uid));
    onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        const obj = snapshot.val().inspections;
        obj && setData(objModify(obj));
      } else {
        toast.error("No data available");
      }
    });
  }

  return (
    <DataProvider.Provider value={{
      userState,
      setUserState,
      cookies,
      setCookie,
      removeCookie,
      data,
      setData,
      users,
      setUsers,
      userRole,
    }}>
      {children}
    </DataProvider.Provider>
  );
};
