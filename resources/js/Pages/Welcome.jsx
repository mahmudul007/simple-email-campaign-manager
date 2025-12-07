import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import InputError from '@/Components/InputError';

export default function Welcome({ auth, status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen flex flex-col lg:flex-row">
                {/* Left side - illustration or background */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-500 to-pink-500 items-center justify-center p-12">
                    <div className="text-center text-white">
                        <h1 className="text-4xl font-bold mb-4">Email Campaign Manager</h1>
                        <p className="text-xl opacity-90">
                            Manage your contacts and email campaigns with ease
                        </p>
                    </div>
                </div>

                {/* Right side - welcome content */}
                <div className="flex flex-1 items-center justify-center p-6 bg-gray-50 dark:bg-black">
                    {auth.user ? (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-4 dark:text-white">
                                Welcome back, {auth.user.name}!
                            </h2>
                            <Link href={route('dashboard')}>
                                <Button size="lg">
                                    Go to Dashboard
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
                            <h2 className="text-3xl font-bold text-center mb-2 dark:text-white">
                                Welcome!
                            </h2>
                            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                                Login to your account
                            </p>

                            {status && (
                                <div className="mb-4 text-sm font-medium text-green-600">
                                    {status}
                                </div>
                            )}

                            {/* Login Form */}
                            <form onSubmit={submit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) => setData('remember', checked)}
                                    />
                                    <Label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Remember me
                                    </Label>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm text-gray-600 dark:text-gray-400 underline hover:text-gray-900 dark:hover:text-gray-200"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}

                                    <Button type="submit" disabled={processing}>
                                        Log in
                                    </Button>
                                </div>
                            </form>

                            <div className="text-center mt-6">
                                <Link
                                    href={route('register')}
                                    className="text-red-500 hover:underline dark:text-red-400"
                                >
                                    Don't have an account? Register
                                </Link>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <h3 className="font-semibold mb-2 dark:text-white">Features:</h3>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li>✓ Contact List</li>
                                    <li>✓ Campaign List</li>
                                    <li>✓ Email Campaign</li>
                                    <li>✓ Queue-based email sending</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
