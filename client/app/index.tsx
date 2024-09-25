import useUser from '@/hooks/auth/useUser.hook';
import Loader from '@/screens/loader/loader.screen';
import { Redirect } from 'expo-router'
import React from 'react'

export default function index() {
    const { loading, user } = useUser();

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Redirect href={!user ? "/(routes)/onboarding" : "/(tabs)"} />
            )}
        </>
    );
}