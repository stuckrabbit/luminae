"use client";

import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import styles from './HeaderTemplate.module.css';
import ProductsBrowser from '../products/ProductsBrowser';
import router from 'next/router';
import { useStore } from 'zustand';
import { useCartStore } from '../lib/store/useCartStore';
import { lucia } from '@/auth';
import { User } from 'lucia';
import { UserContext } from '../utils/UserContext';

function HeaderTemplate()
{
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [cartItemsCount,setCartItemCount] = useState<number>(0);

    const {user} = useContext(UserContext);
    console.log(user);

    let totalItems : number = 0;
    const subscribe = () => useCartStore.subscribe(state => {setCartItemCount(state.getProductCount)});

    subscribe();   


    useEffect(() => {
        setCartItemCount(useCartStore.getState().getProductCount);
        console.log(totalItems);
    },[cartItemsCount]);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };
    
    const onSeachButtonClick = (event : React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.replace('http://localhost:3000/search/' + searchQuery);
    }

    return (<div className={styles.container}>
        <div className={styles.logoContainer}>
            <a href='/'><img src={'/Group1.png'}/>
            </a>
        </div>
        <form className={styles.form} onSubmit={onSeachButtonClick}>
                <input className={styles.searchInput} type="search" placeholder='Search Products' onChange={handleInputChange}/>
                <select className={styles.categorySelector}>
                    <option className={styles.categoriesTextOption}>
                        All Categories
                    </option>
                    <option className={styles.categoriesTextOption}>
                        Men
                    </option>
                    <option className={styles.categoriesTextOption}>
                        Woman
                    </option>
                    <option className={styles.categoriesTextOption}>
                        Kids
                    </option>
                    <option className={styles.categoriesTextOption}>
                        Home Decor
                    </option>
                </select>
                <button className={styles.searchButton} type="submit"><img src={'/images/magnifier.svg'}/></button>
            </form>
            <div className={styles.buttons}>
                <a className={styles.button} href={'http://localhost:3000/auth/signIn'}>
                <img className={styles.btnImage} src="/IconSign in.png"/>
                <p>Sign in</p>
                </a>
                <a className={styles.button} href={'/favorites'}>
                    <img className={styles.btnImage} src="/Favorides.png"/>
                    <p>Favorites</p>
                </a>
                <a className={styles.button} href='/cart'>
                    <img className={styles.btnImage} src="/card.png"/>
                    <p>Cart</p>
                    {cartItemsCount > 0 && <p className={styles.cartItemsText}>{cartItemsCount}</p>}
                </a>
            </div>
        <div>
            <div className={styles.avatarContainer}>
                {true && <a href='http://localhost:3000/auth/signIn'><img className={styles.avatarImage} 
                src='/images/account/profile-user.svg'/></a>}
            </div>
        </div>
    </div>);
}

export default HeaderTemplate;