import { ReactNode } from 'react';

export interface HasChildrenProps {
    children: ReactNode;
}
export interface HasClassName {
    className?: string
}
export interface ButtonProps {
    disabled?: boolean
    onClick?: () => void
}