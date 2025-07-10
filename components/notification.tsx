"use client"

import { useEffect } from "react"
import { CheckCircle, X, AlertCircle } from "lucide-react"

interface NotificationProps {
  type: "success" | "error"
  message: string
  isVisible: boolean
  onClose: () => void
}

export default function Notification({ type, message, isVisible, onClose }: NotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className={`notification ${type}`}>
      <div className="notification-content">
        <div className="notification-icon">
          {type === "success" ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
        </div>
        <div className="notification-message">
          <h4 className="notification-title">{type === "success" ? "Success!" : "Error!"}</h4>
          <p className="notification-text">{message}</p>
        </div>
        <button className="notification-close" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
    </div>
  )
}
