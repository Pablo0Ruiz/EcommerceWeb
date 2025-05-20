"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  onPrimaryButtonClick: () => void;
  onSecondaryButtonClick?: () => void;
  primaryButtonColor?: string;
  secondaryButtonColor?: string;
  showSuccessIcon?: boolean;
  animationDuration?: number;
  secondaryButtonHref?: string;
}

export const PopUp: React.FC<PopUpProps> = ({
  isOpen,
  onClose,
  title,
  message,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  primaryButtonColor = "bg-[#FFD712] hover:bg-yellow-400",
  secondaryButtonColor = "bg-white border border-[#131921] hover:bg-gray-100",
  showSuccessIcon = true,
  animationDuration = 300,
  secondaryButtonHref,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsContentVisible(true), 10);
    } else {
      setIsContentVisible(false);
      setTimeout(() => setIsVisible(false), animationDuration);
    }
  }, [isOpen, animationDuration]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4 transition-opacity"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.50)",
        opacity: isContentVisible ? 1 : 0,
        transition: `opacity ${animationDuration}ms ease-in-out`,
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full transition-transform"
        style={{
          transform: isContentVisible ? "translateY(0)" : "translateY(20px)",
          opacity: isContentVisible ? 1 : 0,
          transition: `all ${animationDuration}ms ease-in-out`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-4">
          {showSuccessIcon && (
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-700">{message}</p>
        </div>

        <div className="flex flex-col space-y-3 mt-6">
          <button
            onClick={onPrimaryButtonClick}
            className={`${primaryButtonColor} text-[#131921] py-2 rounded font-medium transition w-full`}
          >
            {primaryButtonText}
          </button>

          {secondaryButtonHref ? (
            <Link
              href={secondaryButtonHref}
              className={`${secondaryButtonColor} text-[#131921] py-2 rounded font-medium transition w-full text-center`}
            >
              {secondaryButtonText}
            </Link>
          ) : (
            <button
              onClick={onSecondaryButtonClick}
              className={`${secondaryButtonColor} text-[#131921] py-2 rounded font-medium transition w-full`}
            >
              {secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
