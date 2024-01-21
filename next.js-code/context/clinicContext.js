"use client"
import { useContext, createContext } from "react";

export const useClinicContext = createContext({
    updateSlot: () => { },
    refetchSlot: null,
    socket: null
})