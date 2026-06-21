import { useMemo, useRef, useState } from "react";
import { PRODUCTS, type Product } from "@/data";
import ReviewsSection from "@/components/ReviewsSection";
import StoreHero from "@/components/StoreHero";

type Category = "all" | "hats" | "rugs" | "sneakers" | "reviews";
type PayMethod = "card" | "cashapp" | "paypal";

const FILTERS: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "hats", label: "Hats" },
  { key: "rugs", label: "Designer Rugs" },
  { key: "sneakers", label: "Sneakers" },
  { key: "reviews", label: "Reviews" },
];

const PAY_LABELS: Record<PayMethod, string> = {
  card: "Pay with Card",
  cashapp: "Pay with Cash App",
  paypal: "Pay with PayPal",
};

function fmt(n: number) {
  return "$" + n.toLocaleString();
}

export default function App() {
  const [category, setCategory] = useState<Category>("all");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [payMethod, setPayMethod] = useState<PayMethod>("card");
  const [orderDone, setOrderDone] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cashtag, setCashtag] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const shopRef = useRef<HTMLDivElement>(null);

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  const visibleProducts = useMemo(() => {
    let items = category === "all" || category === "reviews" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);
    const q = query.trim().toLowerCase();
    if (q) {
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.sub.toLowerCase().includes(q) ||
          p.tag.toLowerCase().includes(q)
      );
    }
    return items;
  }, [category, query]);

  function addToCart(p: Product) {
    setCart((c) => [...c, p]);
    setCartOpen(true);
  }

  function removeFromCart(id: string) {
    setCart((c) => {
      const idx = c.findIndex((p) => p.id === id);
      if (idx === -1) return c;
      const copy = [...c];
      copy.splice(idx, 1);
      return copy;
    });
  }

  function openCheckout() {
    if (cart.length === 0) return;
    setOrderDone(null);
    setCheckoutOpen(true);
  }

  function submitPayment(e: React.FormEvent) {
    e.preventDefault();
    let detail = "";
    if (payMethod === "card") {
      const last4 = cardNumber.replace(/\s/g, "").slice(-4);
      detail = `Charged ${fmt(total)} to your Visa card ending in ${last4 || "0000"}.`;
    } else if (payMethod === "cashapp") {
      detail = `Charged ${fmt(total)} via Cash App from ${cashtag || "$you"}.`;
    } else {
      detail = `Charged ${fmt(total)} via PayPal (${paypalEmail || "your PayPal account"}).`;
    }
    setOrderDone(detail);
  }

  function closeAfterSuccess() {
    setCheckoutOpen(false);
    setCart([]);
    setCartOpen(false);
    setOrderDone(null);
    setCardNumber("");
    setCardExpiry("");
    setCashtag("");
    setPaypalEmail("");
  }

  return (
    <div className="min-h-screen bg-white text-[#111]">
      <header className="sticky top-0 z-10 bg-black">
        <div className="max-w-[1280px] mx-auto flex items-center gap-6 px-6 py-3.5">
          <h1 className="text-xl font-extrabold tracking-tight whitespace-nowrap text-primary">
            Secondhanddapper
          </h1>
          <nav className="flex gap-1">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setCategory(f.key)}
                className={`px-3.5 py-2 rounded text-[13px] font-semibold transition-colors ${
                  category === f.key ? "bg-white text-black" : "text-[#b3b3b3] hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </nav>
          <div className="flex-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for hats, rugs, sneakers..."
              className="w-full max-w-[480px] bg-[#1a1a1a] border border-[#333] text-white placeholder:text-[#888] rounded px-3.5 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="text-white text-[13px] font-semibold bg-[#1a1a1a] rounded px-4 py-2 whitespace-nowrap"
          >
            Bag <span className="bg-white text-black rounded-full px-1.5 py-0.5 text-[11px] font-bold ml-1">{cart.length}</span>
          </button>
        </div>
      </header>

      {category === "all" && query.trim() === "" && (
        <StoreHero
          onShopClick={() => shopRef.current?.scrollIntoView({ behavior: "smooth" })}
        />
      )}

      <section ref={shopRef} className="max-w-[1280px] mx-auto px-6 pt-10 mb-2">
        <h2 className="text-3xl font-extrabold tracking-tight mb-2">Buy and sell the culture's most wanted.</h2>
        <p className="text-[#6b6b6b] text-[15px]">
          Verified NBA team fits, designer rugs, and the sneakers everyone's chasing — at the current market price.
        </p>
      </section>

      {category === "reviews" ? (
        <ReviewsSection />
      ) : (
        <main className="max-w-[1280px] mx-auto px-6 my-8 mb-20 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-px bg-[#e5e5e5] border border-[#e5e5e5]">
          {visibleProducts.length === 0 ? (
            <p className="p-6 text-[#6b6b6b]">No results found.</p>
          ) : (
            visibleProducts.map((p) => (
              <div key={p.id} className="bg-white flex flex-col hover:ring-2 hover:ring-black hover:ring-inset relative">
                <div className="h-[200px] flex items-center justify-center text-6xl bg-[#f5f5f5]">{p.emoji}</div>
                <div className="p-4 flex flex-col gap-1 flex-1">
                  <span className="text-[11px] uppercase tracking-wide text-[#6b6b6b] font-semibold">{p.tag}</span>
                  <h3 className="text-sm font-bold leading-tight">{p.title}</h3>
                  <p className="text-xs text-[#6b6b6b]">{p.sub}</p>
                  <div className="flex items-center justify-between mt-auto pt-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wide text-[#6b6b6b] font-semibold">Lowest Ask</span>
                      <span className="font-extrabold text-base">{fmt(p.price)}</span>
                    </div>
                    <button
                      onClick={() => addToCart(p)}
                      className="bg-white text-black border-[1.5px] border-black rounded px-3.5 py-1.5 text-xs font-bold uppercase hover:bg-black hover:text-white"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </main>
      )}

      {/* Cart drawer */}
      <aside
        className={`fixed top-0 w-[360px] h-full bg-white border-l border-[#e5e5e5] z-30 flex flex-col transition-[right] duration-300 shadow-[-8px_0_24px_rgba(0,0,0,0.08)] ${
          cartOpen ? "right-0" : "-right-[380px]"
        }`}
      >
        <div className="flex justify-between items-center px-5 py-4.5 border-b border-[#e5e5e5]">
          <h3 className="font-extrabold">Your Bag</h3>
          <button onClick={() => setCartOpen(false)} className="text-[#6b6b6b] text-2xl">&times;</button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <p className="text-[#6b6b6b]">Your bag is empty.</p>
          ) : (
            cart.map((item, i) => (
              <div key={item.id + i} className="flex justify-between items-center py-3 border-b border-[#e5e5e5] text-sm">
                <span>{item.emoji} {item.title}</span>
                <span>
                  {fmt(item.price)}{" "}
                  <button onClick={() => removeFromCart(item.id)} className="text-[#6b6b6b] text-base">&times;</button>
                </span>
              </div>
            ))
          )}
        </div>
        <div className="px-5 py-4 border-t border-[#e5e5e5]">
          <div className="flex justify-between font-extrabold text-[15px] mb-3">
            <span>Total:</span>
            <span>{fmt(total)}</span>
          </div>
          <button
            onClick={openCheckout}
            className="w-full bg-white text-black border-[1.5px] border-black rounded py-3 text-sm font-extrabold uppercase hover:bg-black hover:text-white"
          >
            Checkout
          </button>
        </div>
      </aside>
      {(cartOpen || checkoutOpen) && (
        <div
          className="fixed inset-0 bg-black/40 z-20"
          onClick={() => {
            setCartOpen(false);
          }}
        />
      )}

      {/* Checkout modal */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/55">
          <div className="bg-white w-[420px] max-w-[92vw] max-h-[90vh] overflow-y-auto rounded-[10px]">
            <div className="flex justify-between items-center px-5.5 py-4.5 border-b border-[#e5e5e5]">
              <h3 className="font-extrabold">Checkout</h3>
              <button onClick={() => setCheckoutOpen(false)} className="text-[#6b6b6b] text-2xl">&times;</button>
            </div>
            <div className="p-5.5 pt-5 pb-6.5">
              {!orderDone ? (
                <>
                  <div className="flex gap-1.5 mb-4.5 bg-[#f5f5f5] rounded-lg p-1">
                    {(["card", "cashapp", "paypal"] as PayMethod[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => setPayMethod(m)}
                        className={`flex-1 rounded-md py-2 text-[12.5px] font-bold ${
                          payMethod === m ? "bg-white text-black shadow" : "text-[#6b6b6b]"
                        }`}
                      >
                        {m === "card" ? "Visa / Card" : m === "cashapp" ? "Cash App" : "PayPal"}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={submitPayment} className="flex flex-col gap-3.5">
                    {payMethod === "card" && (
                      <>
                        <label className="flex flex-col gap-1.5 text-[12.5px] font-semibold text-[#6b6b6b]">
                          Card number
                          <input
                            required
                            value={cardNumber}
                            onChange={(e) =>
                              setCardNumber(
                                e.target.value
                                  .replace(/[^\d]/g, "")
                                  .slice(0, 16)
                                  .replace(/(\d{4})(?=\d)/g, "$1 ")
                              )
                            }
                            placeholder="4242 4242 4242 4242"
                            inputMode="numeric"
                            maxLength={19}
                            className="border border-[#e5e5e5] rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
                          />
                        </label>
                        <div className="flex gap-3">
                          <label className="flex-1 flex flex-col gap-1.5 text-[12.5px] font-semibold text-[#6b6b6b]">
                            Expiry
                            <input
                              required
                              value={cardExpiry}
                              onChange={(e) =>
                                setCardExpiry(
                                  e.target.value.replace(/[^\d]/g, "").slice(0, 4).replace(/(\d{2})(?=\d)/, "$1/")
                                )
                              }
                              placeholder="MM/YY"
                              maxLength={5}
                              className="border border-[#e5e5e5] rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
                            />
                          </label>
                          <label className="flex-1 flex flex-col gap-1.5 text-[12.5px] font-semibold text-[#6b6b6b]">
                            CVC
                            <input
                              required
                              placeholder="123"
                              inputMode="numeric"
                              maxLength={4}
                              className="border border-[#e5e5e5] rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
                            />
                          </label>
                        </div>
                        <label className="flex flex-col gap-1.5 text-[12.5px] font-semibold text-[#6b6b6b]">
                          Name on card
                          <input required placeholder="Jane Doe" className="border border-[#e5e5e5] rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary" />
                        </label>
                      </>
                    )}

                    {payMethod === "cashapp" && (
                      <>
                        <label className="flex flex-col gap-1.5 text-[12.5px] font-semibold text-[#6b6b6b]">
                          Cash App $Cashtag
                          <input
                            required
                            value={cashtag}
                            onChange={(e) => setCashtag(e.target.value)}
                            placeholder="$janedoe"
                            className="border border-[#e5e5e5] rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
                          />
                        </label>
                        <p className="text-[12.5px] text-[#6b6b6b]">You'll confirm this payment from the Cash App on your phone.</p>
                      </>
                    )}

                    {payMethod === "paypal" && (
                      <>
                        <label className="flex flex-col gap-1.5 text-[12.5px] font-semibold text-[#6b6b6b]">
                          PayPal email
                          <input
                            required
                            type="email"
                            value={paypalEmail}
                            onChange={(e) => setPaypalEmail(e.target.value)}
                            placeholder="jane@example.com"
                            className="border border-[#e5e5e5] rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
                          />
                        </label>
                        <p className="text-[12.5px] text-[#6b6b6b]">You'll be redirected to PayPal to log in and approve this payment.</p>
                      </>
                    )}

                    <div className="flex justify-between font-extrabold text-[15px] mt-5 mb-3.5">
                      <span>Total due:</span>
                      <span>{fmt(total)}</span>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-white text-black border-[1.5px] border-black rounded-md py-3 text-sm font-extrabold uppercase hover:bg-black hover:text-white"
                    >
                      {PAY_LABELS[payMethod]}
                    </button>
                    <p className="text-center text-[11px] text-[#6b6b6b] mt-2.5">Demo checkout — no real payment is processed.</p>
                  </form>
                </>
              ) : (
                <div className="text-center py-2.5">
                  <div className="w-14 h-14 rounded-full bg-white border-[1.5px] border-black text-black text-3xl flex items-center justify-center mx-auto mb-3.5">
                    &#10003;
                  </div>
                  <h4 className="font-extrabold mb-2">Order confirmed</h4>
                  <p className="text-[#6b6b6b] text-[13.5px] mb-4.5">{orderDone}</p>
                  <button
                    onClick={closeAfterSuccess}
                    className="w-full bg-white text-black border-[1.5px] border-black rounded py-3 text-sm font-extrabold uppercase hover:bg-black hover:text-white"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="text-center text-[#6b6b6b] text-[13px] py-6 border-t border-[#e5e5e5]">
        <p>&copy; 2026 Secondhanddapper. Built for the culture.</p>
      </footer>
    </div>
  );
}
