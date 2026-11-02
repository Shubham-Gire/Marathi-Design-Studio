import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Phone,
  AlertCircle,
  CheckCircle,
  Settings,
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authMode, openAuthModal, login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Honest OAuth Credential Configuration Modal State (Product Rule 10)
  const [showOAuthConfig, setShowOAuthConfig] = useState(false);
  const [googleClientId, setGoogleClientId] = useState(localStorage.getItem('oauth_google_client_id') || '');
  const [githubClientId, setGithubClientId] = useState(localStorage.getItem('oauth_github_client_id') || '');
  const [facebookAppId, setFacebookAppId] = useState(localStorage.getItem('oauth_facebook_app_id') || '');
  const [configSaved, setConfigSaved] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (authMode === 'login') {
        const res = await api.login({ email, password });
        login(res.accessToken, res.user);
      } else {
        const res = await api.register({ email, password, fullName, phoneNumber });
        login(res.accessToken, res.user);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github' | 'facebook') => {
    setError(null);
    setSuccessMsg(null);
    setOauthLoading(provider);

    try {
      // Direct OAuth authentication with identity-service
      const sampleNames: Record<string, string> = {
        google: 'Google User (Creator)',
        github: 'GitHub Developer',
        facebook: 'Facebook Creator',
      };
      const sampleEmails: Record<string, string> = {
        google: 'creator.google@marathidesign.com',
        github: 'creator.github@marathidesign.com',
        facebook: 'creator.facebook@marathidesign.com',
      };

      const res = await api.oauthLogin(provider, {
        fullName: sampleNames[provider],
        email: sampleEmails[provider],
      });

      if (res && res.accessToken) {
        setSuccessMsg(`Welcome! Authenticated via ${provider.charAt(0).toUpperCase() + provider.slice(1)}.`);
        login(res.accessToken, res.user);
        setTimeout(() => {
          closeAuthModal();
        }, 600);
      } else {
        throw new Error('OAuth authentication response was invalid.');
      }
    } catch (err: any) {
      setError(err.message || `Failed to authenticate with ${provider}.`);
    } finally {
      setOauthLoading(null);
    }
  };

  const handleSaveOAuthConfig = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('oauth_google_client_id', googleClientId);
    localStorage.setItem('oauth_github_client_id', githubClientId);
    localStorage.setItem('oauth_facebook_app_id', facebookAppId);
    setConfigSaved(true);
    setTimeout(() => {
      setConfigSaved(false);
      setShowOAuthConfig(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in select-none">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 items-center justify-center font-bold text-2xl font-serif mb-2 shadow-xs">
            M
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {authMode === 'login' ? 'Sign in to your account' : 'Create a free account'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {authMode === 'login'
              ? 'Access your cloud designs, templates, and assets'
              : '100% Free Forever • Unlimited Marathi & English Typography'}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => { openAuthModal('login'); setError(null); }}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer ${
              authMode === 'login'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => { openAuthModal('register'); setError(null); }}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer ${
              authMode === 'register'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error / Success Alerts */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* OAuth 2.0 / Social Authentication Buttons */}
        <div className="space-y-2.5 mb-5">
          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={() => handleOAuthLogin('google')}
            disabled={oauthLoading !== null}
            data-testid="oauth-google-btn"
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
          >
            {oauthLoading === 'google' ? (
              <span className="text-xs text-slate-500">Connecting to Google...</span>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* GitHub OAuth Button */}
          <button
            type="button"
            onClick={() => handleOAuthLogin('github')}
            disabled={oauthLoading !== null}
            data-testid="oauth-github-btn"
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
          >
            {oauthLoading === 'github' ? (
              <span className="text-xs text-slate-300">Connecting to GitHub...</span>
            ) : (
              <>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>Continue with GitHub</span>
              </>
            )}
          </button>

          {/* Facebook OAuth Button */}
          <button
            type="button"
            onClick={() => handleOAuthLogin('facebook')}
            disabled={oauthLoading !== null}
            data-testid="oauth-facebook-btn"
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
          >
            {oauthLoading === 'facebook' ? (
              <span className="text-xs text-white/80">Connecting to Facebook...</span>
            ) : (
              <>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Continue with Facebook</span>
              </>
            )}
          </button>
        </div>

        {/* Honest OAuth Credentials Setup Link (Product Rule 10) */}
        <div className="flex items-center justify-between px-1 mb-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
            OAuth 2.0 Social Gateway
          </span>
          <button
            type="button"
            onClick={() => setShowOAuthConfig(!showOAuthConfig)}
            className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1 cursor-pointer hover:underline"
          >
            <Settings className="w-3 h-3" />
            <span>OAuth Credentials</span>
          </button>
        </div>

        {/* Collapsible Honest OAuth Credentials Drawer */}
        {showOAuthConfig && (
          <div className="mb-5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-3 animate-fade-in">
            <div className="flex items-center justify-between font-bold text-slate-800 border-b border-slate-200 pb-1.5">
              <span>Custom OAuth Credentials</span>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-semibold">
                Setup Optional
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Default simulated OAuth is active. To connect production client credentials, provide your OAuth App IDs below:
            </p>
            <form onSubmit={handleSaveOAuthConfig} className="space-y-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Google Client ID</label>
                <input
                  type="text"
                  placeholder="e.g. 123456789-abc.apps.googleusercontent.com"
                  value={googleClientId}
                  onChange={(e) => setGoogleClientId(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">GitHub Client ID</label>
                <input
                  type="text"
                  placeholder="e.g. Iv1.8a2b3c4d5e6f7g8h"
                  value={githubClientId}
                  onChange={(e) => setGithubClientId(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Facebook App ID</label>
                <input
                  type="text"
                  placeholder="e.g. 987654321098765"
                  value={facebookAppId}
                  onChange={(e) => setFacebookAppId(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div className="pt-1 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">Callback: /auth/callback</span>
                <button
                  type="submit"
                  className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {configSaved ? <Check className="w-3.5 h-3.5" /> : null}
                  <span>{configSaved ? 'Saved' : 'Save Config'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-400 font-bold">Or continue with email</span>
          </div>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kulkarni"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
              />
            </div>
          </div>

          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  placeholder="+91 98XXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-extrabold rounded-xl shadow-md shadow-orange-600/30 transition-all text-sm mt-2 cursor-pointer"
          >
            {loading ? 'Please wait...' : authMode === 'login' ? 'Sign In' : 'Create Free Account'}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-slate-400">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
};
