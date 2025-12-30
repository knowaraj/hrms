import Button from "../ui/Button";

const Greeting = () => {
  return (
    <div className="w-1/2 bg-secondary/40 rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 my-4">
      
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/100?img=12"
          alt="Admin Avatar"
          className="w-14 h-14 rounded-full object-cover"
        />

        <div>
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            Welcome Back, Ramesh
            <span className="text-gray-400 cursor-pointer">✎</span>
          </h2>
          <p className="text-sm text-gray-500">
            We can add
            <span className="text-blue-600 font-medium"> Something</span>{" "}
            Uhh Left &{" "}
            <span className="text-orange-500 font-medium">99</span>{" "}
            Tasks??
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
       
        <Button variant="default" className="text-sm px-4 py-2 rounded-lg">
           Profile
        </Button>
        <Button variant="outline" className="text-sm px-4 py-2 rounded-lg">
          View Tasks
        </Button>
        
      </div>
    </div>
  );
};

export default Greeting;
