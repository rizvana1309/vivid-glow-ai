import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star, Heart, ShoppingCart, X, Plus, Minus, Sparkles } from "lucide-react";
import { getProductsForSection, Product } from "@/lib/mockAnalysis";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const ProductStore = () => {
  const navigate = useNavigate();
  const { section = "skin" } = useParams();
  const products = getProductsForSection(section);
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orderModal, setOrderModal] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [sortBy, setSortBy] = useState("match");

  const sorted = [...products].sort((a, b) => {
    if (sortBy === "match") return b.matchScore - a.matchScore;
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const handleOrder = () => {
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setOrderModal(null);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-hero py-4 px-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-card/50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-display font-bold text-foreground">Your Perfect Match Store</h1>
            <p className="text-sm text-muted-foreground font-body">Products matched by AI analysis</p>
          </div>
          <button className="relative p-2">
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 gradient-accent text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">{cart.length}</span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Sort */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground font-body">{products.length} products matched</p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm font-body bg-card border border-border rounded-lg px-3 py-1.5 text-foreground"
          >
            <option value="match">Best Match</option>
            <option value="price-low">Price: Low to High</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sorted.map((product, i) => (
            <div key={product.id} className="glass-card p-4 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex gap-4">
                <img src={product.image} alt={product.name} className="w-24 h-24 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground font-body">{product.brand}</p>
                      <h3 className="font-display font-semibold text-foreground text-sm">{product.name}</h3>
                    </div>
                    <button
                      onClick={() => setWishlist((w) => w.includes(product.id) ? w.filter((id) => id !== product.id) : [...w, product.id])}
                    >
                      <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground font-body mt-1">{product.shade}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-3 h-3 ${j < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-border'}`} />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">{product.rating}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-body mt-2">{product.description}</p>
              <div className="flex items-center gap-1 mt-2 bg-muted/50 rounded-lg px-2 py-1">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-xs font-body text-primary font-medium">{product.matchScore}% match</span>
                <span className="text-xs text-muted-foreground font-body ml-1">— {product.reason}</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="font-display font-bold text-foreground">₹{product.price}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCart((c) => c.includes(product.id) ? c : [...c, product.id])}
                    className="text-xs font-body font-medium bg-card border border-border px-3 py-1.5 rounded-full hover:bg-muted transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => { setOrderModal(product); setQuantity(1); }}
                    className="text-xs font-body font-medium gradient-accent text-primary-foreground px-4 py-1.5 rounded-full hover-lift"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Order Modal */}
      <Dialog open={!!orderModal} onOpenChange={() => { setOrderModal(null); setOrderSuccess(false); }}>
        <DialogContent className="max-w-md bg-card border-border">
          {orderSuccess ? (
            <div className="text-center py-8 animate-scale-in">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">Order Successful!</h3>
              <p className="text-sm text-muted-foreground font-body">📦 Delivery in 3-5 days</p>
            </div>
          ) : orderModal ? (
            <div className="space-y-4">
              <div className="flex gap-4">
                <img src={orderModal.image} alt={orderModal.name} className="w-20 h-20 rounded-xl object-cover" />
                <div>
                  <h3 className="font-display font-semibold text-foreground">{orderModal.name}</h3>
                  <p className="text-sm text-muted-foreground font-body">{orderModal.shade}</p>
                  <p className="font-display font-bold text-foreground mt-1">₹{orderModal.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-body text-muted-foreground">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full border border-border flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                  <span className="w-8 text-center font-body font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full border border-border flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                </div>
              </div>

              <div>
                <label className="text-sm font-body text-muted-foreground">Delivery Address</label>
                <textarea className="w-full mt-1 bg-muted/50 border border-border rounded-xl p-3 text-sm font-body text-foreground resize-none" rows={2} placeholder="Enter your delivery address" />
              </div>

              <div>
                <label className="text-sm font-body text-muted-foreground">Payment Method</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {["UPI", "Card", "COD"].map((method) => (
                    <button key={method} className="text-sm font-body border border-border rounded-lg py-2 hover:bg-muted transition-colors text-foreground">{method}</button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="font-display font-bold text-foreground">Total: ₹{orderModal.price * quantity}</span>
                <button onClick={handleOrder} className="gradient-accent text-primary-foreground font-body font-semibold px-6 py-2.5 rounded-full hover-lift">
                  Confirm Order
                </button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductStore;
