import { Head } from '@inertiajs/react';
import { Search, Filter, X, Package, Edit2, Check, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { AppLayout } from '@/components/layout/AppLayout';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingState } from '@/components/shared/LoadingState';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { productsApi, Product } from '@/services/api/productsApi';
import { productCategories } from '@/services/mockData';

export default function Products() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Edit dialog state
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPrice, setEditPrice] = useState('');
  const [editStock, setEditStock] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, categoryFilter]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await productsApi.getProducts();
      setProducts(data);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Échec du chargement des produits : ' + (error instanceof Error ? ` ${error.message}` : ''),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by category
    if (categoryFilter && categoryFilter !== 'All') {
      filtered = filtered.filter((product) => product.category === categoryFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  };

  const handleToggleEnabled = async (product: Product) => {
    try {
      const updated = await productsApi.toggleProductEnabled(product.id);
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? updated : p))
      );
      toast({
        title: updated.enabled ? 'Produit activé' : 'Produit désactivé',
        description: `${product.name} est maintenant ${updated.enabled ? 'disponible' : 'indisponible'}`,
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Échec de la mise à jour du produit : ' + (error instanceof Error ? ` ${error.message}` : ''),
        variant: 'destructive',
      });
    }
  };

  const openEditDialog = (product: Product) => {
    setEditProduct(product);
    setEditPrice(product.price.toString());
    setEditStock(product.stock.toString());
    setIsEditOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editProduct) return;

    const price = parseFloat(editPrice);
    const stock = parseInt(editStock, 10);

    if (isNaN(price) || price < 0) {
      toast({
        title: 'Prix invalide',
        description: 'Veuillez entrer un prix valide',
        variant: 'destructive',
      });
      return;
    }

    if (isNaN(stock) || stock < 0) {
      toast({
        title: 'Stock invalide',
        description: 'Veuillez entrer une quantité de stock valide',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      const updated = await productsApi.updateProduct(editProduct.id, {
        price,
        stock,
      });
      setProducts((prev) =>
        prev.map((p) => (p.id === editProduct.id ? updated : p))
      );
      setIsEditOpen(false);
      toast({
        title: 'Produit mis à jour',
        description: `${editProduct.name} a été mis à jour`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update product : ' + (error instanceof Error ? ` ${error.message}` : ''),
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getStockBadgeVariant = (stock: number) => {
    if (stock === 0) return 'destructive';
    if (stock < 10) return 'secondary';
    return 'outline';
  };

  return (
    <AppLayout title="Produits">
      <Head title="Produits" />

      <div className="p-6 space-y-4">
        {/* Filters */}
        <Card>
          <CardContent className="py-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher des produits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {productCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <LoadingState message="Loading products..." />
            ) : filteredProducts.length === 0 ? (
              <EmptyState
                icon={Package}
                title="No products found"
                description={
                  searchQuery || categoryFilter !== 'All'
                    ? 'Try adjusting your filters'
                    : 'Add products to get started'
                }
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id} className="animate-fade-in">
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          {product.description && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {product.description}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.price.toFixed(2)} €
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStockBadgeVariant(product.stock)}>
                          {product.stock === 0 ? 'Rupture de stock' : `${product.stock} unités`}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={product.enabled}
                            onCheckedChange={() => handleToggleEnabled(product)}
                          />
                          <span className={product.enabled ? 'text-foreground' : 'text-muted-foreground'}>
                            {product.enabled ? 'Actif' : 'Désactivé'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(product)}
                        >
                          <Edit2 className="h-4 w-4 mr-1" />
                          Modifier
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le produit</DialogTitle>
          </DialogHeader>
          {editProduct && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nom du produit</Label>
                <p className="text-sm text-muted-foreground">{editProduct.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Prix ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={editStock}
                    onChange={(e) => setEditStock(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)} disabled={isSaving}>
              <XIcon className="h-4 w-4 mr-1" />
              Annuler
            </Button>
            <Button onClick={handleSaveEdit} disabled={isSaving}>
              <Check className="h-4 w-4 mr-1" />
              {isSaving ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
