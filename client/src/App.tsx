import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PaymentForm from "@/pages/PaymentForm";
import BlogSectors from "@/pages/BlogSectors";
import BlogList from "@/pages/BlogList";
import BlogPost from "@/pages/BlogPost";
import Navbar from "@/components/Navbar";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/payment" component={PaymentForm} />
          <Route path="/blog" component={BlogSectors} />
          <Route path="/blog/:sector" component={BlogList} />
          <Route path="/blog/post/:id" component={BlogPost} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
