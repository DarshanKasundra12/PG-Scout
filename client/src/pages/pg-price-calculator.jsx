'use client';
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const basePrice = {
  urban: 2500,
  'semi-urban': 1500,
  ruler: 1000,
}

const roomTypeMultiplier = {
  single: 1.9,
  shared: 1.2,
  dormitory: 0.7,
}

const mealPlanPrice = {
  'no-meals': 0,
  breakfast: 900,
  'full-board': 4800,
}

const amenities = [
  { id: 'wifi', label: 'Wi-Fi', price: 150 },
  { id: 'ac', label: 'AC/Heating', price: 400 },
  { id: 'laundry', label: 'Laundry', price: 100 },
  { id: 'housekeeping', label: 'Housekeeping', price: 150 },
]

export function PgPriceCalculator() {
  const [area, setArea] = useState('urban')
  const [roomType, setRoomType] = useState('shared')
  const [mealPlan, setMealPlan] = useState('no-meals')
  const [selectedAmenities, setSelectedAmenities] = useState([])

  const calculatePrice = () => {
    let price = basePrice[area]
    price *= roomTypeMultiplier[roomType]
    price += mealPlanPrice[mealPlan]
    selectedAmenities.forEach(amenityId => {
      price += amenities.find(a => a.id === amenityId)?.price || 0
    })
    return Math.round(price);
  }

  return (
    (<Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>PG Price Calculator</CardTitle>
        <CardDescription>Estimate your monthly PG accommodation cost</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="area-group">Area</Label>
          <RadioGroup
            id="area-group"
            defaultValue={area}
            onValueChange={(value) => setArea(value)}
            className="flex flex-wrap gap-4 mt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="urban" id="urban" />
              <Label htmlFor="urban">Urban</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="semi-urban" id="semi-urban" />
              <Label htmlFor="semi-urban">Semi Urban</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ruler" id="ruler" />
              <Label htmlFor="ruler">Ruler</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="room-type">Room Type</Label>
          <Select onValueChange={(value) => setRoomType(value)}>
            <SelectTrigger id="room-type" className="w-full mt-2">
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single Occupancy</SelectItem>
              <SelectItem value="shared">Shared Room (2-4 people)</SelectItem>
              <SelectItem value="dormitory">Dormitory</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="meal-plan">Meal Plan</Label>
          <Select onValueChange={(value) => setMealPlan(value)}>
            <SelectTrigger id="meal-plan" className="w-full mt-2">
              <SelectValue placeholder="Select meal plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no-meals">No meals</SelectItem>
              <SelectItem value="breakfast">Breakfast only</SelectItem>
              <SelectItem value="full-board">All meals (Full board)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Amenities</Label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {amenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity.id}
                  checked={selectedAmenities.includes(amenity.id)}
                  onCheckedChange={(checked) => {
                    setSelectedAmenities(checked
                      ? [...selectedAmenities, amenity.id]
                      : selectedAmenities.filter((id) => id !== amenity.id))
                  }} />
                <Label htmlFor={amenity.id}>{amenity.label}</Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full text-center">
          <p className="text-2xl font-bold">
            Estimated Monthly Price: ₹{calculatePrice()}
          </p>
        </div>
      </CardFooter>
    </Card>)
  );
}

export default PgPriceCalculator;