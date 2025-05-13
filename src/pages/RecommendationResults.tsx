
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";

const productRecommendations = [
  {
    id: 1,
    name: "WisGate Edge Lite 2",
    description: "A cost-effective indoor LoRaWAN gateway, perfect for smart home and small business IoT applications.",
    documentationLink: "#",
    image: "placeholder.svg"
  },
  {
    id: 2,
    name: "WisBlock Starter Kit",
    description: "Modular IoT development platform with sensors and connectivity options for rapid prototyping and deployment.",
    documentationLink: "#",
    image: "placeholder.svg"
  },
  {
    id: 3,
    name: "RAK7268 Industrial Gateway",
    description: "Robust LoRaWAN gateway designed for harsh industrial environments with extended temperature range and reliability features.",
    documentationLink: "#",
    image: "placeholder.svg"
  }
];

const RecommendationResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userName, requirements } = location.state || { userName: "User", requirements: "" };
  
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const handleCheckboxChange = (productId: number) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleGoToStore = () => {
    if (selectedProducts.length === 0) {
      toast.error("Please select at least one product");
      return;
    }
    
    const selectedProductNames = selectedProducts.map(id => {
      const product = productRecommendations.find(p => p.id === id);
      return product?.name;
    }).join(", ");
    
    toast.success(`Selected products: ${selectedProductNames}`);
    // In a real app, this would navigate to the store with the selected products
    window.location.href = "/store";
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="bg-blue-gradient py-12 text-white text-center px-4">
        <div className="mx-auto mb-4">
          <div className="w-16 h-16 bg-rak-blue rounded-full flex items-center justify-center mx-auto border-2 border-white">
            <span className="text-2xl font-bold">R</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Your Personalized Recommendations</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Based on your requirements, we recommend the following products
        </p>
      </header>

      {/* Results Section */}
      <div className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white p-5 rounded-lg shadow mb-8 max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold text-rak-blue">Hi {userName},</h2>
            <p className="text-gray-600 mt-1">
              Based on your requirements: <span className="italic">"{requirements.substring(0, 100)}..."</span>, we've selected these products for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {productRecommendations.map((product) => (
              <Card key={product.id} className="p-5 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-32 w-32 object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-rak-blue mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                <div className="flex flex-col space-y-3 mt-auto">
                  <Link to={product.documentationLink} className="text-rak-blue hover:underline text-sm">
                    Documentation <ChevronRight className="inline h-3 w-3" />
                  </Link>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`product-${product.id}`} 
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => handleCheckboxChange(product.id)}
                    />
                    <label htmlFor={`product-${product.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Select this product
                    </label>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-10">
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Button variant="outline" className="flex-1" onClick={() => navigate("/recommendation-form")}>
                Back to Form
              </Button>
              <Button 
                className="bg-rak-blue hover:bg-rak-light-blue flex-1"
                onClick={handleGoToStore}
              >
                Go to Store
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 bg-gray-50 border-t">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          © 2025 RAKwireless Technology Limited. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default RecommendationResults;
