import React, { useState } from "react"
import { Head, useForm } from "@inertiajs/react"
import { Eye, EyeOff, Coffee, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

type FormErrors = {
  email?: string
  password?: string
}

export default function Login() {
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)

  // Inertia form: replaces authApi + manual loading/errors
  const form = useForm({
    email: "",
    password: "",
  })

  // Client-side validation (optional). Laravel validation errors will also show via form.errors.
  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!form.data.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(form.data.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!form.data.password) {
      newErrors.password = "Password is required"
    } else if (form.data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    // Put these client errors into Inertia errors so the UI can display them the same way.
    // We keep server errors too: if server returns errors, they overwrite on submit.
    if (Object.keys(newErrors).length > 0) {
      // @ts-expect-error: setError exists in Inertia useForm but can be typed loosely depending on setup
      Object.entries(newErrors).forEach(([key, value]) => {
        // @ts-expect-error
        form.setError(key, value)
      })
      return false
    }

    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // clear previous client errors
    form.clearErrors()

    if (!validateForm()) return

    // POST to Laravel's login route.
    // If your backend uses a different route, change "/login".
    form.post("/login", {
      preserveScroll: true,
      onSuccess: () => {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        })
      },
      onError: () => {
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        })
      },
    })
  }

  const isLoading = form.processing
  const errors = form.errors as FormErrors

  return (
    <>
      <Head title="Login" />

      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-background p-4">
        <div className="w-full max-w-md animate-fade-in">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
              <Coffee className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Smart Café</h1>
            <p className="text-muted-foreground">Management System</p>
          </div>

          {/* Login Card */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome Back</CardTitle>
              <CardDescription>Sign in to access your café dashboard</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.data.email}
                    onChange={(e) => {
                      form.setData("email", e.target.value)
                      if (errors.email) form.clearErrors("email")
                    }}
                    className={errors.email ? "border-destructive" : ""}
                    disabled={isLoading}
                    autoComplete="email"
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={form.data.password}
                      onChange={(e) => {
                        form.setData("password", e.target.value)
                        if (errors.password) form.clearErrors("password")
                      }}
                      className={errors.password ? "border-destructive pr-10" : "pr-10"}
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 rounded-lg bg-muted/50 p-3 text-center">
                <p className="text-xs text-muted-foreground">
                  <strong>Demo credentials:</strong>
                  <br />
                  demo@smartcafe.com / demo123
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            © 2024 Smart Café. All rights reserved.
          </p>
        </div>
      </div>
    </>
  )
}
