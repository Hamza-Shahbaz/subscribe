import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Flag from "react-flagkit";

const UserNotFound = ({
  phoneNumber,
  setPhoneNumber,
  handleSearch,
  enterRegisteredNumber,
  continueText,
}) => {
  return (
    <div className="max-w-md mx-auto space-y-4 mb-8">
      <div className="text-center mb-4">
        <p className="text-xl text-gray-600">{enterRegisteredNumber}</p>
      </div>
      <div className="space-y-4">
        <div className="relative w-full">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
            <Flag country="SA" className="mr-2" />
            <strong className="mr-1">+966</strong>
          </span>
          <Input
            type="tel"
            placeholder="59 123 4567"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="pl-24 w-full placeholder-gray-100"
          />
        </div>
        <Button
          onClick={handleSearch}
          className="w-full bg-jeeny hover:bg-jeeny/90 text-white"
        >
          {continueText}
        </Button>
      </div>
    </div>
  );
};

export default UserNotFound;
