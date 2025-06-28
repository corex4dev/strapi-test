'use server'

export interface RegisterUserProps {
    username: string;
    password: string;
    email: string;
}

export interface PasswordChangeRequest {
    email: string;
}

export interface PasswordChangeCode {
    password: string;
    passwordConfirmation: string;
    code: string;
}

export interface PasswordChange {
    currentPassword: string;
    password: string;
    passwordConfirmation: string;
}

export const registerUser = async (userData: RegisterUserProps): Promise<string | null> => {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            cache: 'no-cache'
        })

        if (!response.ok) {
            console.log(response.statusText)
            return null
        }

        return await response.text()
    } catch (error) {
        console.log(error)
        return null
    }
}

export const requestPasswordChange = async (userData: PasswordChangeRequest): Promise<string | null> => {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/forgot-password`

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            cache: 'no-cache'
        })

        if (!response.ok) {
            console.log(response.statusText)
            return null
        }

        return await response.text()
    } catch (error) {
        console.log(error)
        return null
    }
}

export const resetPassword = async (userData: PasswordChangeCode): Promise<string | null> => {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/reset-password`

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            cache: 'no-cache'
        })

        if (!response.ok) {
            console.log(response.statusText)
            return null
        }

        return await response.text()
    } catch (error) {
        console.log(error)
        return null
    }
}

export const changePassword = async (userData: PasswordChange, jwt: string): Promise<string | null> => {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/change-password`

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify(userData),
            cache: 'no-cache'
        })

        if (response.status === 400) {
            return await response.text()
        }
        if (response.status === 400) {
            return await response.text()
        }

        if (!response.ok) {
            console.log(response.statusText)
            return null
        }

        return await response.text()
    } catch (error) {
        console.log(error)
        return null
    }
}