import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useProducts } from "@/hooks/useProducts";
import { useQueryClient } from "@tanstack/react-query";
import GoldButton from "@/components/GoldButton";
import { Trash2, Edit, Package, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"products" | "orders">("products");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate("/");
  }, [user, isAdmin, loading, navigate]);

  if (loading) return <main className="min-h-[60vh] flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></main>;
  if (!isAdmin) return null;

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl text-foreground mb-8">Admin Panel</h1>
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setTab("products")}
            className={`flex items-center gap-2 px-4 py-2 font-body text-sm rounded-sm border transition-all ${tab === "products" ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground"}`}
          >
            <Package className="w-4 h-4" /> Products
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`flex items-center gap-2 px-4 py-2 font-body text-sm rounded-sm border transition-all ${tab === "orders" ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground"}`}
          >
            <ShoppingBag className="w-4 h-4" /> Orders
          </button>
        </div>
        {tab === "products" ? <ProductsTab /> : <OrdersTab />}
      </div>
    </main>
  );
};

const ProductsTab = () => {
  const { data: products = [] } = useProducts();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: "", price: "", category: "lawn", description: "", image_url: "", in_stock: true });

  const resetForm = () => {
    setForm({ name: "", price: "", category: "lawn", description: "", image_url: "", in_stock: true });
    setEditing(null);
  };

  const startEdit = (p: any) => {
    setEditing(p);
    setForm({ name: p.name, price: String(p.price), category: p.category, description: p.description || "", image_url: p.image_url || "", in_stock: p.in_stock });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file);
    if (error) { toast.error("Upload failed"); return; }
    const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(path);
    setForm(p => ({ ...p, image_url: publicUrl }));
    toast.success("Image uploaded!");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name: form.name, price: Number(form.price), category: form.category, description: form.description, image_url: form.image_url || null, in_stock: form.in_stock };
    try {
      if (editing) {
        await api.patch(`/api/products/${editing.id}`, payload);
        toast.success("Product updated!");
      } else {
        await api.post("/api/products", payload);
        toast.success("Product added!");
      }
      qc.invalidateQueries({ queryKey: ["products"] });
      resetForm();
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      await api.delete(`/api/products/${id}`);
      qc.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted!");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    }
  };

  const inputClass = "w-full bg-card border border-border p-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 rounded-sm";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <form onSubmit={handleSave} className="lg:col-span-1 bg-card border border-border rounded-sm p-6 space-y-4 h-fit">
        <h2 className="font-display text-lg text-foreground">{editing ? "Edit Product" : "Add Product"}</h2>
        <input placeholder="Product Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required className={inputClass} />
        <input placeholder="Price (e.g. 6900)" type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} required className={inputClass} />
        <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className={inputClass}>
          <option value="lawn">Lawn Collection</option>
          <option value="casual">Casual Wear</option>
        </select>
        <textarea placeholder="Description" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} className={inputClass + " resize-none"} />
        <div>
          <label className="font-body text-xs text-muted-foreground block mb-1">Product Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="font-body text-xs text-muted-foreground" />
          {form.image_url && <img src={form.image_url} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded-sm" />}
        </div>
        <label className="flex items-center gap-2 font-body text-sm text-foreground">
          <input type="checkbox" checked={form.in_stock} onChange={e => setForm(p => ({ ...p, in_stock: e.target.checked }))} />
          In Stock
        </label>
        <div className="flex gap-2">
          <GoldButton type="submit" className="flex-1 text-center">{editing ? "Update" : "Add Product"}</GoldButton>
          {editing && <button type="button" onClick={resetForm} className="px-4 py-2 border border-border text-muted-foreground font-body text-sm rounded-sm">Cancel</button>}
        </div>
      </form>

      <div className="lg:col-span-2 space-y-3">
        {products.length === 0 && <p className="text-muted-foreground font-body">No products yet. Add your first product!</p>}
        {products.map((p: any) => (
          <div key={p.id} className="flex items-center gap-4 bg-card border border-border rounded-sm p-4">
            <img src={p.image_url || "/placeholder.svg"} alt={p.name} className="w-16 h-20 object-cover rounded-sm" />
            <div className="flex-1">
              <h3 className="font-display text-sm text-foreground">{p.name}</h3>
              <p className="font-body text-xs text-muted-foreground">{p.category} · {p.in_stock ? "In Stock" : "Out of Stock"}</p>
              <p className="font-body text-sm text-primary">Rs. {p.price.toLocaleString()}</p>
            </div>
            <button onClick={() => startEdit(p)} className="p-2 text-muted-foreground hover:text-primary"><Edit className="w-4 h-4" /></button>
            <button onClick={() => handleDelete(p.id)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

const OrdersTab = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});

  const fetchOrders = async () => {
    try {
      const data = await api.get("/api/orders");
      setOrders(data || []);
    } catch {
      setOrders([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    try {
      await api.patch(`/api/orders/${orderId}`, { status });
      toast.success(`Order marked as ${status}`);
      fetchOrders();
    } catch (err: any) {
      toast.error(err.message || "Failed to update");
    }
  };

  const saveTracking = async (orderId: string) => {
    const tracking_number = trackingInputs[orderId]?.trim();
    if (!tracking_number) {
      toast.error("Enter tracking number");
      return;
    }
    try {
      await api.patch(`/api/orders/${orderId}`, { tracking_number });
      toast.success("Tracking number saved");
      setTrackingInputs((p) => ({ ...p, [orderId]: "" }));
      fetchOrders();
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    }
  };

  if (loading) return <p className="text-muted-foreground font-body">Loading orders...</p>;

  return (
    <div className="space-y-4">
      {orders.length === 0 && <p className="text-muted-foreground font-body">No orders yet.</p>}
      {orders.map((o: any) => (
        <div key={o.id} className="bg-card border border-border rounded-sm p-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-display text-sm text-foreground">Order #{o.id.slice(0, 8)}</p>
              <p className="font-body text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</p>
            </div>
            <span className={`px-3 py-1 rounded-sm font-body text-xs uppercase tracking-wider ${
              o.status === "pending" ? "bg-primary/10 text-primary" :
              o.status === "processing" ? "bg-blue-500/10 text-blue-400" :
              o.status === "delivered" ? "bg-green-500/10 text-green-400" :
              "bg-destructive/10 text-destructive"
            }`}>{o.status}</span>
          </div>
          <div className="font-body text-sm text-muted-foreground">
            <p>{o.shipping_name} · {o.shipping_phone}</p>
            <p>{o.shipping_address}, {o.shipping_city}</p>
          </div>
          {o.tracking_number && (
            <p className="font-body text-xs text-primary">Tracking: {o.tracking_number}</p>
          )}
          <div className="flex flex-wrap gap-2 items-center">
            <input
              placeholder="Tracking number"
              value={trackingInputs[o.id] ?? ""}
              onChange={(e) => setTrackingInputs((p) => ({ ...p, [o.id]: e.target.value }))}
              className="max-w-[200px] bg-background border border-border px-3 py-1.5 font-body text-xs rounded-sm"
            />
            <button onClick={() => saveTracking(o.id)} className="px-3 py-1.5 border border-primary/40 text-primary font-body text-xs rounded-sm hover:bg-primary/10">Save tracking</button>
          </div>
          <div className="space-y-1">
            {o.order_items?.map((item: any) => (
              <p key={item.id} className="font-body text-xs text-foreground">
                {item.product_name} × {item.quantity} {item.size ? `(${item.size})` : ""} — Rs. {(item.price * item.quantity).toLocaleString()}
              </p>
            ))}
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="font-display text-sm text-primary">Total: Rs. {Number(o.total).toLocaleString()}</p>
            <div className="flex gap-2">
              {o.status === "pending" && <button onClick={() => updateStatus(o.id, "processing")} className="px-3 py-1 border border-blue-400/40 text-blue-400 font-body text-xs rounded-sm hover:bg-blue-400/10">Process</button>}
              {(o.status === "pending" || o.status === "processing") && <button onClick={() => updateStatus(o.id, "delivered")} className="px-3 py-1 border border-green-400/40 text-green-400 font-body text-xs rounded-sm hover:bg-green-400/10">Delivered</button>}
              {o.status !== "cancelled" && o.status !== "delivered" && <button onClick={() => updateStatus(o.id, "cancelled")} className="px-3 py-1 border border-destructive/40 text-destructive font-body text-xs rounded-sm hover:bg-destructive/10">Cancel</button>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Admin;
