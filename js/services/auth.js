import directusConfig from '../../config/directusConfig.js'
import { toast } from '../services/sweetalert2.js'

export const register = async (email, password) => {
  try {
    const response = await fetch(`${directusConfig.baseURL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      toast('User registered successfully.', 'success', 'top')
      return true
    } else {
      console.error('Registration failed:', response.data.errors)
      toast('Failed to register. Please try again.', 'error')
      return false
    }
  } catch (error) {
    console.error('An error occurred:', error)
    toast('Failed to register. Please try again.', 'error')
    return false
  }
}

export async function login(email, password) {
  try {
    const response = await fetch(`${directusConfig.baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem('access_token', data.data.access_token)
      localStorage.setItem('refresh_token', data.data.refresh_token)
      toast('Login successful.', 'success', 'top')
      return true
    } else {
      console.error('Login failed:', data.errors)
      toast('Login failed.', 'error')
      return false
    }
  } catch (error) {
    console.error('An error occurred:', error)
    toast('An error occurred.', 'error')
    return false
  }
}

export function logout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
}
