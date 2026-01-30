
import React, { useState, useMemo } from 'react';
import { ViewType, ArtAsset, UserHolding, Transaction, InsuranceStatus } from './types';
import { MOCK_ASSETS } from './constants';
import InsuranceBadge from './components/InsuranceBadge';
import AssetCard from './components/AssetCard';
import GuaranteeBar from './components/GuaranteeBar';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('HOME');
  const [selectedAsset, setSelectedAsset] = useState<ArtAsset | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock User State
  const [userBalance, setUserBalance] = useState(25400.50);
  const [userHoldings, setUserHoldings] = useState<UserHolding[]>([
    { assetId: '1', fractionsOwned: 120, averagePrice: 118.00 },
    { assetId: '4', fractionsOwned: 5, averagePrice: 305.00 }
  ]);

  // Profile State
  const [userProfile, setUserProfile] = useState({
    name: 'Investidor AUREA',
    handle: '@early_adopter',
    email: 'investidor@aurea.art',
    bio: 'Colecionador de arte digital e entusiasta do movimento neoconcreto brasileiro.',
    walletId: '0x71C...9A23'
  });

  const totalPortfolioValue = useMemo(() => {
    return userHoldings.reduce((acc, holding) => {
      const asset = MOCK_ASSETS.find(a => a.id === holding.assetId);
      return acc + (holding.fractionsOwned * (asset?.fractionPrice || 0));
    }, 0);
  }, [userHoldings]);

  const navigateToAsset = (asset: ArtAsset) => {
    setSelectedAsset(asset);
    setCurrentView('ASSET_DETAIL');
  };

  const handleProfileUpdate = (field: string, value: string) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  const renderHome = () => (
    <div className="p-6 pb-32 space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent uppercase tracking-tighter">
            AUREA MOBILE
          </h1>
          <p className="text-slate-400 text-xs font-medium tracking-widest uppercase">Fundo de Arte</p>
        </div>
        <button 
          onClick={() => setCurrentView('PROFILE')}
          className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 shadow-lg active:scale-90 transition-transform hover:border-amber-500/50 cursor-pointer group"
        >
          <i className="fa-solid fa-user text-amber-400 group-hover:text-amber-300"></i>
        </button>
      </header>

      {/* Dashboard de Custódia */}
      <section className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <i className="fa-solid fa-vault text-7xl text-amber-500"></i>
        </div>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Resumo Patrimonial</p>
        <div className="flex items-baseline gap-2">
          <h2 className="text-4xl font-black text-white tracking-tighter">R$ {totalPortfolioValue.toLocaleString('pt-BR')}</h2>
          <span className="text-emerald-400 font-bold text-sm bg-emerald-400/10 px-2 py-0.5 rounded-full">+2.4%</span>
        </div>
        <div className="mt-6 flex gap-3">
          <button className="flex-1 bg-amber-500 text-slate-900 font-black py-3.5 rounded-xl active:scale-95 transition-all shadow-lg shadow-amber-500/20 text-xs uppercase tracking-widest">
            Depositar
          </button>
          <button className="flex-1 bg-slate-700 text-white font-bold py-3.5 rounded-xl active:scale-95 transition-all border border-slate-600 text-xs uppercase tracking-widest">
            Sacar
          </button>
        </div>
      </section>

      {/* Seção Minha Coleção */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-black text-white uppercase tracking-[0.15em]">Minha Coleção</h3>
          {/* BOTÃO PRINCIPAL: MINHAS COLEÇÕES (Link Externo) */}
          <a 
            href="https://fundodearte.com/artistas-acervo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full shadow-lg shadow-amber-500/20 hover:scale-105 transition-all active:scale-95"
          >
            <i className="fa-solid fa-gem"></i>
            MINHAS COLEÇÕES
          </a>
        </div>

        {/* CARD INTERATIVO PARA O ACERVO CATALOGADO */}
        <div 
          onClick={() => setCurrentView('CATALOG')}
          className="group relative w-full h-60 bg-slate-900 border border-amber-500/40 rounded-[2.5rem] overflow-hidden cursor-pointer active:scale-[0.98] transition-all shadow-2xl ring-1 ring-white/5"
        >
          {/* Preview da Galeria Institucional */}
          <div className="absolute inset-0">
            <img 
              src="https://picsum.photos/seed/institutional/1000/800" 
              className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000"
              alt="Galeria fundodearte.com"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
          </div>

          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 bg-amber-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-amber-500/40 group-hover:rotate-12 transition-transform">
                <i className="fa-solid fa-building-columns text-slate-950 text-2xl"></i>
              </div>
              <div className="space-y-1">
                <h4 className="text-white font-black uppercase text-2xl leading-none tracking-tighter">Galeria de Arquivos</h4>
                <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.35em]">fundodearte.com/artistas-acervo</p>
              </div>
            </div>
            <p className="text-slate-300 text-[11px] font-medium max-w-[260px] leading-tight opacity-90 group-hover:opacity-100 transition-opacity">
              Acesso exclusivo à curadoria de originação premium e ativos históricos sob gestão do Fundo de Arte.
            </p>
            <div className="absolute top-8 right-8 h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-2xl">
              <i className="fa-solid fa-arrow-right text-lg"></i>
            </div>
          </div>
        </div>

        {/* Lista de Holdings em Carteira */}
        <div className="space-y-3 pt-4">
          <div className="flex items-center gap-3 px-1 mb-2">
            <div className="h-[1px] flex-1 bg-slate-800"></div>
            <span className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em]">Ativos Sob Custódia</span>
            <div className="h-[1px] flex-1 bg-slate-800"></div>
          </div>
          {userHoldings.map(holding => {
            const asset = MOCK_ASSETS.find(a => a.id === holding.assetId);
            if (!asset) return null;
            return (
              <div 
                key={holding.assetId}
                onClick={() => navigateToAsset(asset)}
                className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 flex items-center gap-5 cursor-pointer hover:border-amber-500/30 transition-all group active:scale-[0.99] shadow-xl"
              >
                <div className="h-16 w-16 rounded-xl overflow-hidden shrink-0 border border-slate-700/50 shadow-inner">
                   <img src={asset.imageUrl} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-black text-xs truncate uppercase tracking-tight">{asset.title}</h4>
                  <p className="text-slate-500 text-[9px] font-black uppercase tracking-tighter mt-1">{holding.fractionsOwned} Frações Validadas</p>
                </div>
                <div className="text-right shrink-0">
                  <InsuranceBadge status={asset.insuranceStatus} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );

  const renderProfile = () => (
    <div className="p-6 pb-32 space-y-8 animate-in slide-in-from-right duration-300 bg-slate-950 min-h-screen">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentView('HOME')}
            className="h-12 w-12 bg-slate-800 rounded-full flex items-center justify-center text-white shadow-2xl active:scale-90 transition-transform hover:bg-slate-700 border border-slate-700"
          >
            <i className="fa-solid fa-chevron-left text-lg"></i>
          </button>
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Meu Perfil</h2>
            <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.25em]">AUREA ID</p>
          </div>
        </div>
      </header>

      <div className="flex flex-col items-center gap-4 py-6">
        <div className="relative group cursor-pointer">
          <div className="w-28 h-28 rounded-full bg-slate-800 border-2 border-amber-500/50 flex items-center justify-center overflow-hidden shadow-2xl group-hover:border-amber-500 transition-colors">
            <i className="fa-solid fa-user text-5xl text-slate-600 group-hover:text-slate-400"></i>
          </div>
          <div className="absolute bottom-0 right-0 bg-amber-500 h-8 w-8 rounded-full flex items-center justify-center text-slate-900 border border-slate-950 shadow-lg">
            <i className="fa-solid fa-camera text-xs"></i>
          </div>
        </div>
        <div className="text-center">
           <h3 className="text-white font-black text-xl uppercase tracking-tight">{userProfile.name}</h3>
           <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">{userProfile.handle}</p>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl backdrop-blur-sm">
         <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
               <i className="fa-solid fa-circle-check text-emerald-500"></i>
               Status KYC
            </span>
            <span className="bg-emerald-500/10 text-emerald-500 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-500/20">
               Verificado
            </span>
         </div>

         <div className="space-y-4">
            <div className="space-y-2">
               <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Nome Completo</label>
               <div className="relative">
                  <i className="fa-solid fa-id-card absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-xs"></i>
                  <input 
                    type="text" 
                    value={userProfile.name}
                    onChange={(e) => handleProfileUpdate('name', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-10 pr-4 text-xs font-bold text-white focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
                  />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Email Principal</label>
               <div className="relative">
                  <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-xs"></i>
                  <input 
                    type="email" 
                    value={userProfile.email}
                    onChange={(e) => handleProfileUpdate('email', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-10 pr-4 text-xs font-bold text-white focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
                  />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Handle / Usuário</label>
               <div className="relative">
                  <i className="fa-solid fa-at absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-xs"></i>
                  <input 
                    type="text" 
                    value={userProfile.handle}
                    onChange={(e) => handleProfileUpdate('handle', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-10 pr-4 text-xs font-bold text-white focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
                  />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Bio</label>
               <textarea 
                 value={userProfile.bio}
                 onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                 rows={3}
                 className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 px-4 text-xs font-bold text-white focus:outline-none focus:border-amber-500 transition-colors shadow-inner resize-none leading-relaxed"
               />
            </div>
         </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
         <div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Carteira Conectada</p>
            <p className="text-white text-xs font-mono font-bold tracking-tight">{userProfile.walletId}</p>
         </div>
         <button className="h-8 w-8 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <i className="fa-solid fa-copy text-xs"></i>
         </button>
      </div>

      <button 
        onClick={() => setCurrentView('HOME')}
        className="w-full bg-amber-500 text-slate-950 font-black py-4 rounded-xl active:scale-95 transition-all shadow-lg shadow-amber-500/20 text-xs uppercase tracking-[0.2em] hover:bg-amber-400"
      >
        Salvar Alterações
      </button>
    </div>
  );

  const renderCatalog = () => (
    <div className="p-6 pb-32 space-y-8 animate-in slide-in-from-bottom duration-700 bg-slate-950">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentView('HOME')}
            className="h-12 w-12 bg-slate-800 rounded-full flex items-center justify-center text-white shadow-2xl active:scale-90 transition-transform hover:bg-slate-700"
          >
            <i className="fa-solid fa-chevron-left text-lg"></i>
          </button>
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Galeria Institucional</h2>
            <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em]">Arquivos Catalogados</p>
          </div>
        </div>
        <div className="h-14 w-14 bg-amber-500/10 border border-amber-500/20 rounded-3xl flex items-center justify-center shadow-inner">
          <i className="fa-solid fa-gem text-amber-500 text-2xl"></i>
        </div>
      </header>

      {/* Hero da Galeria */}
      <div className="relative h-64 rounded-[3.5rem] overflow-hidden group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-slate-800">
        <img 
          src="https://picsum.photos/seed/gallery_master/1200/800" 
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
          alt="Acervo" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-10 flex flex-col justify-end">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[2px] w-10 bg-amber-500"></span>
            <p className="text-amber-500 text-[11px] font-black uppercase tracking-[0.4em]">Originação Premium</p>
          </div>
          <h3 className="text-white text-3xl font-black uppercase tracking-tighter leading-none mb-3">Acervo de Artistas</h3>
          <p className="text-slate-300 text-xs font-medium max-w-[280px] leading-relaxed">
            Exploração digital dos ativos exclusivos certificados pela curadoria do <span className="text-white font-bold">FUNDO DE ARTE</span> em fundodearte.com/artistas-acervo.
          </p>
        </div>
      </div>

      {/* Itens do Catálogo */}
      <div className="space-y-12">
        {MOCK_ASSETS.filter(a => a.isCatalogOnly).map(asset => (
          <div 
            key={asset.id}
            onClick={() => navigateToAsset(asset)}
            className="group relative"
          >
            <div className="relative aspect-[3/4] rounded-[3.5rem] overflow-hidden border border-slate-800 shadow-2xl transition-all group-hover:border-amber-500/40 ring-1 ring-white/5">
               <img src={asset.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" alt={asset.title} />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
               
               <div className="absolute top-10 right-10">
                  <InsuranceBadge status={asset.insuranceStatus} showText />
               </div>
               
               <div className="absolute bottom-12 left-12 right-12">
                  <p className="text-amber-500 text-[12px] font-black uppercase tracking-[0.45em] mb-3">Mestre Catalogado</p>
                  <h4 className="text-white text-5xl font-black leading-none mb-8 uppercase tracking-tighter group-hover:text-amber-200 transition-colors drop-shadow-2xl">{asset.title}</h4>
                  
                  <div className="flex justify-between items-center border-t border-white/20 pt-8">
                    <div className="space-y-1">
                      <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">Artista</p>
                      <p className="text-white font-black text-2xl tracking-tight uppercase">{asset.artist}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">Avaliação</p>
                      <p className="text-amber-500 font-black text-3xl tracking-tighter">R$ {(asset.totalValue / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>
               </div>
            </div>
            
            <div className="mt-6 px-12 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
               <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.25em] flex items-center gap-3">
                 <i className="fa-solid fa-file-shield text-amber-500 text-lg"></i> Ficha de Originação
               </span>
               <div className="h-12 w-12 rounded-full border border-slate-800 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-xl">
                 <i className="fa-solid fa-arrow-right text-lg"></i>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Link Externo Oficial */}
      <div className="pt-16 pb-24 text-center space-y-10">
         <div className="flex justify-center items-center gap-8 opacity-20">
            <i className="fa-solid fa-gem text-amber-500 text-3xl"></i>
            <div className="h-[1px] w-20 bg-slate-700"></div>
            <i className="fa-solid fa-gem text-amber-500 text-3xl"></i>
            <div className="h-[1px] w-20 bg-slate-700"></div>
            <i className="fa-solid fa-gem text-amber-500 text-3xl"></i>
         </div>
         
         <div className="space-y-6">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] max-w-[320px] mx-auto leading-relaxed italic">
              "A curadoria fundodearte.com assegura a autenticidade e proveniência de cada ativo catalogado."
            </p>
            <a 
              href="https://fundodearte.com/artistas-acervo" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-4 px-14 py-6 bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 text-xs font-black uppercase tracking-[0.2em] rounded-[2rem] shadow-3xl shadow-amber-500/40 hover:scale-105 transition-all active:scale-95 border border-white/20"
            >
              ACESSAR ACERVO COMPLETO <i className="fa-solid fa-external-link text-sm"></i>
            </a>
         </div>
      </div>
    </div>
  );

  const renderMarketplace = () => {
    const filteredAssets = MOCK_ASSETS.filter(asset => {
        if (asset.isCatalogOnly) return false;
        if (!searchQuery) return true;
        const lowerQuery = searchQuery.toLowerCase();
        return (
          asset.title.toLowerCase().includes(lowerQuery) ||
          asset.artist.toLowerCase().includes(lowerQuery)
        );
    });

    return (
    <div className="p-6 pb-32 space-y-6 animate-in fade-in duration-500">
      <div className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-lg pt-2 pb-4 -mx-6 px-6">
        <h2 className="text-2xl font-bold text-white mb-4 tracking-tighter uppercase">Marketplace</h2>
        
        <div className="relative mb-4">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
            <input 
                type="text" 
                placeholder="BUSCAR POR OBRA OU ARTISTA..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-xs font-bold text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 transition-all uppercase tracking-wide shadow-inner"
            />
            {searchQuery && (
                <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                    <i className="fa-solid fa-xmark text-sm"></i>
                </button>
            )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['Todos', 'Modernos', 'Contemporâneos', 'Fracionados', 'Obras Totais'].map(filter => (
            <button key={filter} className="whitespace-nowrap px-4 py-2 bg-slate-800 rounded-full text-[10px] font-black uppercase text-slate-300 border border-slate-700 hover:border-amber-500 transition-colors tracking-widest">
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {filteredAssets.length > 0 ? (
            filteredAssets.map(asset => (
                <AssetCard 
                    key={asset.id} 
                    asset={asset} 
                    onClick={() => navigateToAsset(asset)}
                />
            ))
        ) : (
            <div className="text-center py-20 opacity-40">
                <i className="fa-solid fa-search text-4xl mb-4 text-slate-600"></i>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Nenhum ativo encontrado</p>
            </div>
        )}
      </div>
    </div>
  );
  };

  const renderAssetDetail = () => {
    if (!selectedAsset) return null;
    return (
      <div className="pb-32 animate-in slide-in-from-right duration-300">
        <div className="relative h-96">
          <img src={selectedAsset.imageUrl} className="w-full h-full object-cover" alt="" />
          <button 
            onClick={() => setCurrentView('MARKETPLACE')}
            className="absolute top-12 left-6 h-10 w-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
        </div>

        <div className="px-6 -mt-8 relative z-10 space-y-6">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="bg-amber-500 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter italic shadow-lg">Blue Chip</span>
              <InsuranceBadge status={selectedAsset.insuranceStatus} showText />
            </div>
            <h1 className="text-3xl font-black text-white leading-tight uppercase tracking-tighter">{selectedAsset.title}</h1>
            <p className="text-amber-400 font-bold text-lg uppercase tracking-tight">{selectedAsset.artist}, {selectedAsset.year}</p>
          </div>

          <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl backdrop-blur-sm">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <i className="fa-solid fa-file-contract text-amber-500"></i>
              Smart Recibo (Ficha Técnica)
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Seguradora</p>
                <p className="text-slate-200 font-bold text-xs uppercase tracking-tight">{selectedAsset.insuranceCompany}</p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Apólice Nº</p>
                <p className="text-slate-200 font-bold text-xs uppercase tracking-tight">{selectedAsset.policyNumber}</p>
              </div>
            </div>
            
            <GuaranteeBar expiryDate={selectedAsset.insuranceExpiry} />

            <div className="pt-2">
              <button className="w-full flex justify-between items-center bg-slate-800 hover:bg-slate-700 p-4 rounded-xl transition-all shadow-lg active:scale-95">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Laudo de Autenticidade Digital</span>
                <i className="fa-solid fa-download text-amber-400 text-sm"></i>
              </button>
            </div>
          </section>

          <section className="space-y-3">
             <h4 className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
               <i className="fa-solid fa-quote-left text-amber-500/40"></i>
               Sobre a Obra
             </h4>
             <p className="text-slate-400 text-sm leading-relaxed font-medium">{selectedAsset.description}</p>
          </section>

          <div className="fixed bottom-24 left-6 right-6 flex gap-3 z-50">
            <div className="flex-1 bg-slate-900 border border-slate-700 p-3 rounded-2xl shadow-2xl backdrop-blur-md bg-opacity-90">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Cotação Fração</p>
              <p className="text-lg font-black text-white tracking-tighter">R$ {selectedAsset.fractionPrice}</p>
            </div>
            <button className="flex-[2] bg-emerald-500 text-slate-950 font-black text-sm uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-emerald-500/20 active:scale-95 transition-all hover:bg-emerald-400">
              ADQUIRIR FRAÇÃO
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderTrading = () => (
    <div className="p-6 pb-32 space-y-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Trading & Swaps</h2>
      
      {/* Swap UI */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Swap Inteligente</h3>
          <i className="fa-solid fa-circle-info text-slate-600"></i>
        </div>
        
        <div className="relative h-96 bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 p-6 flex flex-col items-center justify-center text-center space-y-6 shadow-2xl group">
           <div className="absolute top-6 left-6 right-6 flex justify-between">
              <span className="bg-amber-500/10 text-amber-500 text-[10px] font-black px-3 py-1.5 rounded-full border border-amber-500/20 uppercase tracking-widest animate-pulse">Matching...</span>
           </div>
           
           <div className="relative">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-amber-500 ring-8 ring-amber-500/10 mb-2 shadow-2xl transform group-hover:rotate-6 transition-transform">
                <img src="https://picsum.photos/seed/swap1/200" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 h-10 w-10 rounded-full flex items-center justify-center border-4 border-slate-800 shadow-xl">
                <i className="fa-solid fa-repeat text-slate-900 text-sm"></i>
              </div>
           </div>
           
           <div>
             <h4 className="text-white font-black text-xl tracking-tight uppercase">Hélio Oiticica</h4>
             <p className="text-amber-500 text-xs font-bold italic tracking-tighter">"Metaesquema (1958)"</p>
           </div>
           
           <p className="text-slate-400 text-xs px-4 leading-relaxed font-medium">Troca atômica por ativos de <span className="text-amber-400 font-bold uppercase">Lygia Clark</span> ou <span className="text-amber-400 font-bold uppercase">Loio-Pérsio</span>.</p>
           
           <div className="flex gap-4 w-full pt-2">
              <button className="flex-1 bg-red-500/10 text-red-500 p-5 rounded-2xl border border-red-500/20 hover:bg-red-500/20 transition-colors active:scale-95">
                <i className="fa-solid fa-xmark text-2xl"></i>
              </button>
              <button className="flex-1 bg-emerald-500/10 text-emerald-500 p-5 rounded-2xl border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors active:scale-95">
                <i className="fa-solid fa-heart text-2xl"></i>
              </button>
           </div>
        </div>
      </section>

      {/* Sell Slider Concept */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">
        <h3 className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
          <i className="fa-solid fa-chart-line text-amber-500"></i>
          Liquidação Fracionada
        </h3>
        <div className="space-y-5">
          <div className="flex justify-between items-end">
             <span className="text-slate-500 text-[10px] uppercase font-black tracking-widest">Saída Estratégica</span>
             <span className="text-amber-500 font-black text-3xl tracking-tighter italic">65%</span>
          </div>
          <input type="range" className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500" />
          <div className="flex justify-between text-[10px] text-slate-600 font-black uppercase tracking-tighter">
            <span>Mín 1%</span>
            <span>Máx 100%</span>
          </div>
          <button className="w-full bg-white text-slate-900 font-black py-4 rounded-2xl text-sm uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95 shadow-xl">
             CONFIRMAR VENDA
          </button>
        </div>
      </section>
    </div>
  );

  const renderWallet = () => (
    <div className="p-6 pb-32 space-y-8 animate-in fade-in duration-500">
      <header className="space-y-3">
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">AUREA Wallet</h2>
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-[2rem] flex justify-between items-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-full bg-amber-500/5 -skew-x-12"></div>
          <div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Saldo Disponível</p>
            <p className="text-3xl font-black text-white tracking-tighter">R$ {userBalance.toLocaleString('pt-BR')}</p>
          </div>
          <button className="h-14 w-14 bg-amber-500 rounded-2xl flex items-center justify-center text-slate-900 text-2xl shadow-xl shadow-amber-500/20 active:scale-90 transition-all hover:bg-amber-400">
             <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </header>

      <section className="space-y-4">
        <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2 px-1">
           <i className="fa-solid fa-clock-rotate-left text-amber-500/50"></i>
           Histórico de Ativos
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Cota Hélio Oiticica', val: '- R$ 1.250,00', date: 'Hoje, 14:30', type: 'buy' },
            { label: 'Cota Mira Schendel', val: '+ R$ 850,00', date: 'Ontem', type: 'sell' },
            { label: 'Aporte PIX Institucional', val: '+ R$ 5.000,00', date: '12 Out', type: 'deposit' },
          ].map((tx, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex justify-between items-center hover:border-slate-700 transition-colors shadow-sm active:scale-[0.99]">
               <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${tx.type === 'buy' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-400'}`}>
                    <i className={`fa-solid ${tx.type === 'buy' ? 'fa-arrow-up-right' : 'fa-arrow-down-left'} text-[10px]`}></i>
                  </div>
                  <div>
                    <p className="text-white font-bold text-xs uppercase tracking-tight">{tx.label}</p>
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-tighter mt-0.5">{tx.date}</p>
                  </div>
               </div>
               <p className={`font-black tracking-tighter text-sm ${tx.type === 'buy' ? 'text-slate-400' : 'text-emerald-400'}`}>{tx.val}</p>
            </div>
          ))}
        </div>
      </section>

      <button className="w-full py-5 border-2 border-dashed border-slate-800 rounded-2xl text-slate-600 font-black uppercase tracking-widest text-[10px] hover:border-amber-500/50 hover:text-amber-500/50 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg">
        <i className="fa-solid fa-file-invoice-dollar text-sm"></i>
        Exportar Relatório Fiscal (DIF)
      </button>
    </div>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-950 relative shadow-2xl overflow-x-hidden ring-1 ring-slate-800 antialiased selection:bg-amber-500/30">
      <main className="min-h-screen">
        {currentView === 'HOME' && renderHome()}
        {currentView === 'MARKETPLACE' && renderMarketplace()}
        {currentView === 'ASSET_DETAIL' && renderAssetDetail()}
        {currentView === 'TRADING' && renderTrading()}
        {currentView === 'WALLET' && renderWallet()}
        {currentView === 'CATALOG' && renderCatalog()}
        {currentView === 'PROFILE' && renderProfile()}
        {currentView === 'TOKENIZE' && (
           <div className="p-8 text-center space-y-10 py-24 animate-in zoom-in duration-500">
             <div className="w-24 h-24 bg-amber-500/10 rounded-[2rem] flex items-center justify-center mx-auto border border-amber-500/20 shadow-2xl shadow-amber-500/5 transform rotate-3">
                <i className="fa-solid fa-file-shield text-4xl text-amber-500"></i>
             </div>
             <div>
               <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Tokenizar Obra</h2>
               <p className="text-slate-500 text-xs font-medium px-4">Regra de Ouro: <span className="text-amber-500 font-black italic">"Só entra se tiver SEGURO"</span>.</p>
             </div>
             
             <div className="bg-slate-900 border-2 border-dashed border-slate-800 p-12 rounded-[2.5rem] space-y-5 hover:border-amber-500/40 transition-all group cursor-pointer active:scale-95 shadow-xl">
                <i className="fa-solid fa-cloud-arrow-up text-5xl text-slate-700 group-hover:text-amber-500 transition-colors group-hover:bounce"></i>
                <div className="space-y-1">
                  <p className="text-slate-300 font-black uppercase text-[10px] tracking-widest">Apólice de Seguro</p>
                  <p className="text-slate-600 text-[10px] font-medium leading-tight">Envie o PDF para validação biométrica</p>
                </div>
                <input type="file" className="hidden" id="policy-upload" />
                <label htmlFor="policy-upload" className="inline-block bg-slate-800 text-white px-8 py-3 rounded-xl text-[10px] font-black cursor-pointer uppercase tracking-widest hover:bg-slate-700 transition-all shadow-xl">
                  Selecionar
                </label>
             </div>

             <div className="p-6 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800/50 text-left shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-5">
                  <i className="fa-solid fa-lock text-4xl"></i>
                </div>
                <p className="text-[9px] font-black text-amber-500 uppercase mb-2 tracking-[0.25em] flex items-center gap-2">
                  <i className="fa-solid fa-fingerprint text-xs"></i>
                  Certificação Atômica
                </p>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium leading-tight">O protocolo AUREA só habilita a custódia após confirmação real-time com as seguradoras parceiras via Oráculo.</p>
             </div>

             <button disabled className="w-full py-5 bg-slate-800 text-slate-600 font-black rounded-2xl cursor-not-allowed uppercase tracking-[0.25em] text-xs shadow-2xl">
                TOKENIZAR ATIVO
             </button>
           </div>
        )}
      </main>

      {/* Botão de Tokenização Flutuante */}
      {currentView === 'HOME' && (
        <button 
          onClick={() => setCurrentView('TOKENIZE')}
          className="fixed top-6 right-20 z-50 h-10 px-5 bg-amber-500 text-slate-950 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-amber-500/30 active:scale-90 transition-all border border-amber-400/40 flex items-center gap-2"
        >
          <i className="fa-solid fa-plus text-[10px]"></i> Tokenizar
        </button>
      )}

      {/* Barra de Navegação Inferior */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-22 bg-slate-950/95 backdrop-blur-2xl border-t border-slate-900 flex justify-around items-center px-6 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
        {[
          { icon: 'fa-house', label: 'Home', view: 'HOME' },
          { icon: 'fa-compass', label: 'Explorar', view: 'MARKETPLACE' },
          { icon: 'fa-shuffle', label: 'Swap', view: 'TRADING' },
          { icon: 'fa-wallet', label: 'Ativos', view: 'WALLET' }
        ].map((item) => (
          <button
            key={item.view}
            onClick={() => {
              setCurrentView(item.view as ViewType);
              setSelectedAsset(null);
            }}
            className={`flex flex-col items-center justify-center gap-1.5 w-16 transition-all active:scale-75 ${
              currentView === item.view ? 'text-amber-500' : 'text-slate-600 hover:text-slate-400'
            }`}
          >
            <div className={`h-1 w-5 rounded-full mb-1 transition-all ${currentView === item.view ? 'bg-amber-500' : 'bg-transparent'}`}></div>
            <i className={`fa-solid ${item.icon} text-xl transition-transform ${currentView === item.view ? 'scale-110' : ''}`}></i>
            <span className="text-[8px] font-black uppercase tracking-[0.2em]">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
