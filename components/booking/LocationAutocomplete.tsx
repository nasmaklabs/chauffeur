"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { EnvironmentOutlined } from "@ant-design/icons";

interface LocationAutocompleteProps {
  placeholder: string;
  value?: string;
  onChange?: (
    address: string,
    coordinates: { lat: number; lng: number } | null
  ) => void;
}

interface Suggestion {
  description: string;
  place_id: string;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  placeholder,
  value = "",
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
      const mapDiv = document.createElement("div");
      placesService.current = new window.google.maps.places.PlacesService(
        mapDiv
      );
    }
  }, []);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Notify parent that text changed but coordinates not yet available
    onChange?.(newValue, null);

    if (!newValue.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        {
          input: newValue,
          componentRestrictions: { country: "gb" },
        },
        (predictions, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSuggestions(
              predictions.map((p) => ({
                description: p.description,
                place_id: p.place_id,
              }))
            );
            setShowSuggestions(true);
          } else {
            setSuggestions([]);
            setShowSuggestions(false);
          }
        }
      );
    }
  };

  const handleSelectSuggestion = (suggestion: Suggestion) => {
    setInputValue(suggestion.description);
    setShowSuggestions(false);
    setSuggestions([]); // Clear suggestions after selection

    // Blur the input to close mobile keyboard
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    if (placesService.current) {
      placesService.current.getDetails(
        {
          placeId: suggestion.place_id,
          fields: ["geometry", "formatted_address"],
        },
        (place, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            place?.geometry?.location
          ) {
            const coordinates = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };
            onChange?.(suggestion.description, coordinates);
          } else {
            onChange?.(suggestion.description, null);
          }
        }
      );
    } else {
      onChange?.(suggestion.description, null);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <Input
        prefix={<EnvironmentOutlined className="text-primary" />}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
        autoComplete="off"
        className="location-autocomplete-input"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div className="px-4 py-2 bg-blue-50 border-b border-blue-200 text-xs text-blue-700">
            Select a location from the list below
          </div>
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.place_id}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              <div className="flex items-start gap-2">
                <EnvironmentOutlined className="text-gray-400 mt-1 shrink-0" />
                <span className="text-sm text-gray-700">
                  {suggestion.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;
