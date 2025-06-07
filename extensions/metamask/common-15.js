LavaPack.loadBundle(
  [
    [
      7611,
      {
        '../../app/scripts/lib/util': 204,
        '../../shared/constants/app': 5789,
        '../../shared/constants/bridge': 5790,
        '../../shared/constants/hardware-wallets': 5796,
        '../../shared/constants/keyring': 5797,
        '../../shared/constants/labels': 5798,
        '../../shared/constants/multichain/assets': 5802,
        '../../shared/constants/network': 5804,
        '../../shared/constants/swaps': 5815,
        '../../shared/constants/terms': 5816,
        '../../shared/constants/time': 5817,
        '../../shared/constants/tokens': 5818,
        '../../shared/constants/transaction': 5819,
        '../../shared/lib/multichain/chain-agnostic-permission-utils/caip-accounts': 5840,
        '../../shared/lib/multichain/chain-agnostic-permission-utils/caip-chainids': 5841,
        '../../shared/lib/multichain/chain-agnostic-permission-utils/misc-utils': 5842,
        '../../shared/modules/conversion.utils': 5858,
        '../../shared/modules/hexstring-utils': 5864,
        '../../shared/modules/selectors/networks': 5875,
        '../../shared/modules/selectors/util': 5877,
        '../../shared/modules/string-utils': 5878,
        '../../shared/modules/transaction.utils': 5880,
        '../../shared/notifications': 5882,
        '../ducks/app/app': 6845,
        '../ducks/metamask/metamask': 6860,
        '../helpers/constants/design-system': 6872,
        '../helpers/utils/snaps': 6916,
        '../helpers/utils/util': 6921,
        '../pages/confirmations/confirmation/templates': 7282,
        './accounts': 7592,
        './approvals': 7594,
        './multichain': 7605,
        './remote-feature-flags': 7609,
        './transactions': 7617,
        '@metamask/bridge-controller': 1414,
        '@metamask/chain-agnostic-permission': 1498,
        '@metamask/controller-utils': 1515,
        '@metamask/keyring-api': 2014,
        '@metamask/keyring-controller': 2021,
        '@metamask/name-controller': 2190,
        '@metamask/network-controller': 2202,
        '@metamask/permission-controller': 2421,
        '@metamask/snaps-rpc-methods': 2733,
        '@metamask/snaps-utils': 2890,
        '@metamask/transaction-controller': 2946,
        '@metamask/utils': 2995,
        lodash: 4921,
        'punycode/punycode.js': 5140,
        reselect: 5353,
        semver: 5617,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.accountSupportsSmartTx = function (e) {
                    const t = ne(e);
                    return Boolean('snap' !== t);
                  }),
                  (n.accountsWithSendEtherInfoSelector = we),
                  (n.activeTabHasPermissions = function (e) {
                    var t;
                    const { activeTab: n, metamask: a } = e,
                      { subjects: r = {} } = a;
                    return Boolean(
                      Object.keys(
                        (null === (t = r[n.origin]) || void 0 === t ? void 0 : t.permissions) || {}
                      ).length > 0
                    );
                  }),
                  (n.checkIfMethodIsEnabled = function (e, t) {
                    const n = (0, Q.getSelectedInternalAccount)(e);
                    return Boolean(n.methods.includes(t));
                  }),
                  (n.checkNetworkAndAccountSupports1559 = function (e, t) {
                    return (0, b.isEIP1559Network)(e, t);
                  }),
                  (n.checkNetworkOrAccountNotSupports1559 = function (e) {
                    return (0, b.isNotEIP1559Network)(e);
                  }),
                  (n.doesAddressRequireLedgerHidConnection = function (e, t) {
                    const n = (0, b.isAddressLedger)(e, t),
                      a = (0, b.getLedgerTransportType)(e) === k.LedgerTransportTypes.webhid,
                      r =
                        (0, B.getLedgerWebHidConnectedStatus)(e) !==
                        k.WebHIDConnectedStatuses.connected,
                      o = (0, B.getLedgerTransportStatus)(e) !== k.HardwareTransportStates.verified;
                    return n && a && (r || o);
                  }),
                  (n.getAccountName = function (e, t) {
                    const n = e.find(e => (0, L.isEqualCaseInsensitive)(e.address, t));
                    return n && '' !== n.metadata.name ? n.metadata.name : '';
                  }),
                  (n.getAccountToConnectToActiveTab = function (e) {
                    const t = (0, Q.getSelectedInternalAccount)(e),
                      n = qt(e),
                      {
                        metamask: {
                          internalAccounts: { accounts: a },
                        },
                      } = e,
                      r = Object.keys(a).length;
                    if (n.length && n.length !== r && -1 === n.findIndex(e => e === t.address))
                      return ie(e, t.id);
                    return undefined;
                  }),
                  (n.getAccountType = ne),
                  (n.getAccountTypeForKeyring = ae),
                  (n.getAccountsWithLabels = function (e) {
                    return _e(e).map(e => {
                      const {
                        address: t,
                        metadata: { name: n },
                        balance: a,
                      } = e;
                      return {
                        ...e,
                        addressLabel: `${n.length < C.TRUNCATED_NAME_CHAR_LIMIT ? n : `${n.slice(0, C.TRUNCATED_NAME_CHAR_LIMIT - 1)}...`} (${(0, R.shortenAddress)(t)})`,
                        label: n,
                        balance: a,
                      };
                    });
                  }),
                  (n.getAddressBook = Ce),
                  (n.getAddressBookEntry = ye),
                  (n.getAddressBookEntryOrAccountName = function (e, t) {
                    const n = ye(e, t);
                    if (n && '' !== n.name) return n.name;
                    const a = Object.values((0, Q.getInternalAccounts)(e)).find(e =>
                      (0, L.isEqualCaseInsensitive)(e.address, t)
                    );
                    return (null == a ? void 0 : a.metadata.name) || t;
                  }),
                  (n.getAddressConnectedSubjectMap = function (e) {
                    const t = Wt(e),
                      n = Ht(e),
                      a = {};
                    return (
                      Object.keys(n).forEach(e => {
                        const { iconUrl: r, name: o } = t[e] || {};
                        n[e].forEach(t => {
                          const n = o || e;
                          a[t] = a[t]
                            ? { ...a[t], [e]: { iconUrl: r, name: n } }
                            : { [e]: { iconUrl: r, name: n } };
                        });
                      }),
                      a
                    );
                  }),
                  (n.getAdvancedGasFeeValues = function (e) {
                    return e.metamask.advancedGasFee[(0, _.getCurrentChainId)(e)];
                  }),
                  (n.getAdvancedInlineGasShown = function (e) {
                    return Boolean(e.metamask.featureFlags.advancedInlineGas);
                  }),
                  (n.getAllAccountsOnNetworkAreEmpty = function (e) {
                    const t = pe(e) ?? {},
                      n = Object.values(t).every(e => '0x0' === e || '0x00' === e),
                      a = 0 === le(e);
                    return n && a;
                  }),
                  (n.getAllConnectedAccounts = n.getAllChainsToPoll = void 0),
                  (n.getAllDetectedTokens = function (e) {
                    return e.metamask.allDetectedTokens;
                  }),
                  (n.getAllDetectedTokensForSelectedAddress = function (e) {
                    if (!(0, b.getCompletedOnboarding)(e)) return {};
                    const { address: t } = (0, Q.getSelectedInternalAccount)(e);
                    return Object.entries(e.metamask.allDetectedTokens || {}).reduce(
                      (e, [n, a]) => {
                        const r = a[t];
                        return r && (e[n] = r.map(e => ({ ...e, chainId: n }))), e;
                      },
                      {}
                    );
                  }),
                  (n.getAllDomains = ke),
                  (n.getAllEnabledNetworks = void 0),
                  (n.getAllPermittedAccounts = Lt),
                  (n.getAllPermittedAccountsForCurrentTab = function (e) {
                    return Lt(e, Je(e));
                  }),
                  (n.getAllPermittedAccountsForSelectedTab = function (e, t) {
                    return Lt(e, t);
                  }),
                  (n.getAllPermittedChainsForSelectedTab = function (e, t) {
                    return Ut(e, t).filter(e => {
                      try {
                        const { namespace: t } = (0, A.parseCaipChainId)(e);
                        return t !== A.KnownCaipNamespace.Wallet;
                      } catch (e) {
                        return !1;
                      }
                    });
                  }),
                  (n.getAllPermittedScopes = Ut),
                  (n.getAllSnapAvailableUpdates = void 0),
                  (n.getAllTokens = Ne),
                  (n.getAnySnapUpdateAvailable = void 0),
                  (n.getAppIsLoading = function (e) {
                    return e.appState.isLoading;
                  }),
                  (n.getBlockExplorerLinkText = function (e, t = !1) {
                    const n = Ot(e),
                      a = Ze(e);
                    let r = { firstPart: 'addBlockExplorer', secondPart: '' };
                    a.blockExplorerUrl
                      ? (r = t
                          ? {
                              firstPart: 'blockExplorerView',
                              secondPart: (0, R.getURLHostName)(a.blockExplorerUrl),
                            }
                          : {
                              firstPart: 'viewinExplorer',
                              secondPart: 'blockExplorerAccountAction',
                            })
                      : !1 === n &&
                        (r = t
                          ? { firstPart: 'etherscanViewOn', secondPart: '' }
                          : {
                              firstPart: 'viewOnEtherscan',
                              secondPart: 'blockExplorerAccountAction',
                            });
                    return r;
                  }),
                  (n.getConnectedSubjectsForAllAddresses =
                    n.getConnectedSnapsList =
                    n.getConnectedSitesListWithNetworkInfo =
                    n.getConnectedSitesList =
                    n.getConfirmationExchangeRates =
                    n.getChainIdsToPoll =
                      void 0),
                  (n.getConnectedSubjectsForSelectedAddress = function (e) {
                    const t = (0, Q.getSelectedInternalAccount)(e),
                      n = Mt(e),
                      a = Wt(e),
                      r = [];
                    return (
                      Object.entries(n).forEach(([e, n]) => {
                        if (!Kt(n).includes(t.address)) return;
                        const { extensionId: o, name: s, iconUrl: i } = a[e] || {};
                        r.push({ extensionId: o, origin: e, name: s, iconUrl: i });
                      }),
                      r
                    );
                  }),
                  (n.getCrossChainMetaMaskCachedBalances = function (e) {
                    const t = e.metamask.accountsByChainId;
                    return Object.keys(t).reduce(
                      (e, n) => (
                        (e[n] = Object.keys(t[n]).reduce(
                          (e, a) => ((e[a] = t[n][a].balance), e),
                          {}
                        )),
                        e
                      ),
                      {}
                    );
                  }),
                  (n.getCrossChainTokenExchangeRates = void 0),
                  (n.getCurrencyRates = tt),
                  (n.getCurrentAccountWithSendEtherInfo = Oe),
                  (n.getCurrentEthBalance = function (e) {
                    var t;
                    return null === (t = Oe(e)) || void 0 === t ? void 0 : t.balance;
                  }),
                  (n.getCurrentKeyring = ee),
                  (n.getCurrentNetwork = void 0),
                  (n.getCurrentQRHardwareState = function (e) {
                    const { qrHardware: t } = e.metamask;
                    return t || {};
                  }),
                  (n.getCustomNonceValue = function (e) {
                    return String(e.appState.customNonceValue);
                  }),
                  (n.getCustomTokenAmount = function (e) {
                    return e.appState.customTokenAmount;
                  }),
                  (n.getDefaultHomeActiveTabName = function (e) {
                    return e.metamask.defaultHomeActiveTabName;
                  }),
                  (n.getDetectedTokensInCurrentNetwork = function (e) {
                    var t;
                    const n = (0, _.getCurrentChainId)(e),
                      { address: a } = (0, Q.getSelectedInternalAccount)(e);
                    return null === (t = e.metamask.allDetectedTokens) ||
                      void 0 === t ||
                      null === (t = t[n]) ||
                      void 0 === t
                      ? void 0
                      : t[a];
                  }),
                  (n.getEditedNetwork = function (e) {
                    return e.appState.editedNetwork;
                  }),
                  (n.getEnabledSnaps = void 0),
                  (n.getEnsResolutionByAddress = function (e, t) {
                    if (e.metamask.ensResolutionsByAddress[t]) {
                      const n = e.metamask.ensResolutionsByAddress[t];
                      return (0, r.toUnicode)(n);
                    }
                    const n = ye(e, t) || se(e, t);
                    return (null == n ? void 0 : n.name) || '';
                  }),
                  (n.getEthereumAddressNames = function (e) {
                    var t;
                    return (
                      (null === (t = e.metamask.names) || void 0 === t
                        ? void 0
                        : t[l.NameType.ETHEREUM_ADDRESS]) || {}
                    );
                  }),
                  (n.getEvmInternalAccounts = void 0),
                  (n.getExternalServicesOnboardingToggleState = function (e) {
                    return e.appState.externalServicesOnboardingToggleState;
                  }),
                  (n.getFeatureFlags = function (e) {
                    return e.metamask.featureFlags;
                  }),
                  (n.getFeatureNotificationsEnabled = function (e) {
                    const { featureNotificationsEnabled: t = !1 } = Le(e);
                    return t;
                  }),
                  (n.getFirstPermissionRequest = function (e) {
                    const t = Qt(e);
                    return t && t[0] ? t[0] : null;
                  }),
                  (n.getFirstSnapInstallOrUpdateRequest = function (e) {
                    var t;
                    return (null === (t = zt(e)) || void 0 === t ? void 0 : t[0]) ?? null;
                  }),
                  (n.getFullTxData = void 0),
                  (n.getHDEntropyIndex = function (e) {
                    const t = oe(e),
                      n = ge(e),
                      a = n
                        .filter(e => e.type === I.KeyringType.hdKeyTree)
                        .findIndex(e => e.accounts.includes(t));
                    return -1 === a ? undefined : a;
                  }),
                  (n.getHardwareWalletType = function (e) {
                    const t = ee(e);
                    return te(e) ? t.type : undefined;
                  }),
                  (n.getHdKeyringOfSelectedAccountOrPrimaryKeyring =
                    n.getHdKeyringIndexByIdOrDefault =
                      void 0),
                  (n.getHiddenAccountsList = Nt),
                  (n.getInterfaceContent =
                    n.getInterface =
                    n.getInsightSnaps =
                    n.getInsightSnapIds =
                    n.getHideSnapBranding =
                      void 0),
                  (n.getInternalAccount = ie),
                  (n.getInternalAccountsSortedByKeyring = n.getInternalAccountByAddress = void 0),
                  (n.getIpfsGateway = function (e) {
                    return e.metamask.ipfsGateway;
                  }),
                  (n.getIsAddSnapAccountEnabled = function (e) {
                    return e.metamask.addSnapAccountEnabled;
                  }),
                  (n.getIsAddingNewNetwork = function (e) {
                    return e.appState.isAddingNewNetwork;
                  }),
                  (n.getIsBitcoinSupportEnabled = function (e) {
                    const { bitcoinSupportEnabled: t } = e.metamask;
                    return Boolean(t);
                  }),
                  (n.getIsBitcoinTestnetSupportEnabled = function (e) {
                    const { bitcoinTestnetSupportEnabled: t } = e.metamask;
                    return Boolean(t);
                  }),
                  (n.getIsBridgeChain = function (e, t) {
                    const n = (0, Q.getSelectedInternalAccount)(e),
                      { chainId: a, isEvmNetwork: r } = (0, X.getMultichainNetwork)(e, n);
                    let o = a;
                    r && (o = (0, _.getCurrentChainId)(e));
                    const s = t ?? o;
                    return w.ALLOWED_BRIDGE_CHAIN_IDS.includes(s);
                  }),
                  (n.getIsBridgeEnabled = void 0),
                  (n.getIsCustomNetwork = Ot),
                  (n.getIsDynamicTokenListAvailable = yt),
                  (n.getIsLineaMainnet = function (e) {
                    return (0, _.getCurrentChainId)(e) === N.CHAIN_IDS.LINEA_MAINNET;
                  }),
                  (n.getIsMainnet = be),
                  (n.getIsMultiRpcOnboarding = function (e) {
                    return e.appState.isMultiRpcOnboarding;
                  }),
                  (n.getIsNonStandardEthChain = function (e) {
                    return !(be(e) || Be(e));
                  }),
                  (n.getIsPortfolioDiscoverButtonEnabled = function (e) {
                    const { nePortfolioDiscoverButton: t } = (0, Z.getRemoteFeatureFlags)(e);
                    return Boolean(t);
                  }),
                  (n.getIsSecurityAlertsEnabled = function (e) {
                    return e.metamask.securityAlertsEnabled;
                  }),
                  (n.getIsSigningQRHardwareTransaction = function (e) {
                    var t;
                    return (
                      (null === (t = e.metamask.qrHardware) ||
                      void 0 === t ||
                      null === (t = t.sign) ||
                      void 0 === t
                        ? void 0
                        : t.request) !== undefined
                    );
                  }),
                  (n.getIsSolanaSupportEnabled = function (e) {
                    const { addSolanaAccount: t } = (0, Z.getRemoteFeatureFlags)(e);
                    return Boolean(t);
                  }),
                  (n.getIsSwapsChain = function (e, t) {
                    const n = (0, _.getCurrentChainId)(e),
                      a = t ?? n;
                    return y.ALLOWED_PROD_SWAPS_CHAIN_IDS.includes(a);
                  }),
                  (n.getIsTestnet = Be),
                  (n.getIsTokenDetectionInactiveOnMainnet = wt),
                  (n.getIsTokenDetectionSupported = function (e) {
                    const t = Ct(e),
                      n = yt(e);
                    return t && n;
                  }),
                  (n.getIsTokenNetworkFilterEqualCurrentNetwork = Fe),
                  (n.getIsWatchEthereumAccountEnabled = function (e) {
                    return e.metamask.watchEthereumAccountEnabled;
                  }),
                  (n.getIstokenDetectionInactiveOnNonMainnetSupportedNetwork = function (e) {
                    const t = Ct(e),
                      n = be(e);
                    return yt(e) && !t && !n;
                  }),
                  (n.getKeyringOfSelectedAccount = void 0),
                  (n.getKeyringSnapAccounts = function (e) {
                    const t = (0, Q.getInternalAccounts)(e);
                    return Object.values(t).filter(e => {
                      const { keyring: t } = e.metadata;
                      return t.type === I.KeyringType.snap;
                    });
                  }),
                  (n.getKeyringSnapRemovalResult = function (e) {
                    return e.appState.keyringRemovalSnapModal;
                  }),
                  (n.getKnownMethodData = function (e, t) {
                    const { knownMethodData: n, use4ByteResolution: a } = e.metamask;
                    if (!a || !(0, G.hasTransactionData)(t)) return null;
                    const r = (0, h.addHexPrefix)(t).slice(0, 10);
                    if (r.length < 10) return null;
                    return (null == n ? void 0 : n[r]) ?? null;
                  }),
                  (n.getLastConnectedInfo = function (e) {
                    const { permissionHistory: t = {} } = e.metamask;
                    return Object.keys(t).reduce(
                      (e, n) => (
                        t[n].eth_accounts && (e[n] = JSON.parse(JSON.stringify(t[n].eth_accounts))),
                        e
                      ),
                      {}
                    );
                  }),
                  (n.getLastViewedUserSurvey = function (e) {
                    return e.metamask.lastViewedUserSurvey;
                  }),
                  (n.getLocale = Tt),
                  (n.getManageInstitutionalWallets = function (e) {
                    return e.metamask.manageInstitutionalWallets;
                  }),
                  (n.getMarketData = void 0),
                  (n.getMaybeSelectedInternalAccount = function (e) {
                    var t, n;
                    const a =
                      null === (t = e.metamask.internalAccounts) || void 0 === t
                        ? void 0
                        : t.selectedAccount;
                    return a
                      ? null === (n = e.metamask.internalAccounts) || void 0 === n
                        ? void 0
                        : n.accounts[a]
                      : undefined;
                  }),
                  (n.getMemoizedUnapprovedTemplatedConfirmations =
                    n.getMemoizedUnapprovedConfirmations =
                    n.getMemoizedTargetSubjectMetadata =
                    n.getMemoizedMetadataContract =
                    n.getMemoizedMetaMaskInternalAccounts =
                    n.getMemoizedInterfaces =
                    n.getMemoizedInterfaceContent =
                    n.getMemoizedInterface =
                    n.getMemoizedCurrentChainId =
                      void 0),
                  (n.getMetaMaskAccountBalances = me),
                  (n.getMetaMaskAccountsOrdered =
                    n.getMetaMaskAccountsConnected =
                    n.getMetaMaskAccounts =
                      void 0),
                  (n.getMetaMaskCachedBalances = pe),
                  (n.getMetaMaskHdKeyrings = void 0),
                  (n.getMetaMaskKeyrings = ge),
                  (n.getMetaMaskKeyringsMetadata = function (e) {
                    return e.metamask.keyringsMetadata;
                  }),
                  (n.getMetaMetricsDataDeletionId = function (e) {
                    return e.metamask.metaMetricsDataDeletionId;
                  }),
                  (n.getMetaMetricsDataDeletionStatus = function (e) {
                    return e.metamask.metaMetricsDataDeletionStatus;
                  }),
                  (n.getMetaMetricsDataDeletionTimestamp = function (e) {
                    return e.metamask.metaMetricsDataDeletionTimestamp;
                  }),
                  (n.getMetaMetricsId = function (e) {
                    const { metaMetricsId: t } = e.metamask;
                    return t;
                  }),
                  (n.getNameLookupSnapsIds =
                    n.getMultipleTargetsSubjectMetadata =
                    n.getMetadataContractName =
                      void 0),
                  (n.getNameSources = function (e) {
                    return e.metamask.nameSources || {};
                  }),
                  (n.getNames = function (e) {
                    return e.metamask.names || {};
                  }),
                  (n.getNativeCurrencyForChain = nt),
                  (n.getNativeCurrencyImage = function (e) {
                    const t = (0, _.getCurrentChainId)(e);
                    return N.CHAIN_ID_TOKEN_IMAGE_MAP[t];
                  }),
                  (n.getNativeTokenCachedBalanceByChainIdByAccountAddress = Ee),
                  (n.getNativeTokenCachedBalanceByChainIdSelector = void 0),
                  (n.getNativeTokenInfo = Ae),
                  (n.getNetworkConfigurationIdByChainId = n.getNetworkClientIdsToPoll = void 0),
                  (n.getNetworkIdentifier = function (e) {
                    const { type: t, nickname: n, rpcUrl: a } = (0, _.getProviderConfig)(e);
                    return n || a || t;
                  }),
                  (n.getNetworkToAutomaticallySwitchTo = function (e) {
                    const t = kt(e),
                      n = Je(e);
                    if (
                      (0, h.getEnvironmentType)() === H.ENVIRONMENT_TYPE_POPUP &&
                      (0, b.getIsUnlocked)(e) &&
                      n &&
                      0 === t
                    ) {
                      const t = ke(e)[n],
                        a = It(e);
                      if (t && a.id !== t) return t;
                    }
                    return null;
                  }),
                  (n.getNetworksTabSelectedNetworkConfigurationId = function (e) {
                    return e.appState.selectedNetworkConfigurationId;
                  }),
                  (n.getNewNetworkAdded = function (e) {
                    return e.appState.newNetworkAddedName;
                  }),
                  (n.getNewNftAddedMessage = function (e) {
                    return e.appState.newNftAddedMessage;
                  }),
                  (n.getNewTokensImported = function (e) {
                    return e.appState.newTokensImported;
                  }),
                  (n.getNewTokensImportedError = function (e) {
                    return e.appState.newTokensImportedError;
                  }),
                  (n.getNextSuggestedNonce = function (e) {
                    return Number(e.appState.nextNonce);
                  }),
                  (n.getNftIsStillFetchingIndication = function (e) {
                    return e.appState.isNftStillFetchingIndication;
                  }),
                  (n.getNotifySnaps = void 0),
                  (n.getNumberOfAllUnapprovedTransactionsAndMessages = kt),
                  (n.getNumberOfTokens = le),
                  (n.getOnboardedInThisUISession = function (e) {
                    return e.appState.onboardedInThisUISession;
                  }),
                  (n.getOnboardingDate = function (e) {
                    return e.metamask.onboardingDate;
                  }),
                  (n.getOpenSeaEnabled = function (e) {
                    return Boolean(e.metamask.openSeaEnabled);
                  }),
                  (n.getOrderedConnectedAccountsForActiveTab = Yt),
                  (n.getOrderedConnectedAccountsForConnectedDapp = $t),
                  (n.getOrderedNetworksList = function (e) {
                    return e.metamask.orderedNetworkList;
                  }),
                  (n.getOriginOfCurrentTab = Je),
                  (n.getPendingTokens = void 0),
                  (n.getPermissionSubjects = Mt),
                  (n.getPermissionSubjectsDeepEqual = void 0),
                  (n.getPermissions = function (e, t) {
                    var n;
                    return null === (n = Mt(e)[t]) || void 0 === n ? void 0 : n.permissions;
                  }),
                  (n.getPermissionsForActiveTab = function (e) {
                    var t;
                    const { activeTab: n, metamask: a } = e,
                      { subjects: r = {} } = a,
                      o =
                        (null === (t = r[n.origin]) || void 0 === t ? void 0 : t.permissions) ?? {};
                    return Object.keys(o).map(e => ({ key: e, value: o[e] }));
                  }),
                  (n.getPermissionsRequests = Qt),
                  (n.getPermittedAccountsByOrigin = Ht),
                  (n.getPermittedEVMAccounts = bt),
                  (n.getPermittedEVMAccountsForCurrentTab = qt),
                  (n.getPermittedEVMAccountsForSelectedTab = Ft),
                  (n.getPermittedEVMChains = Bt),
                  (n.getPermittedEVMChainsByOrigin = function (e) {
                    const t = Mt(e);
                    return Object.keys(t).reduce((e, n) => {
                      const a = jt(Gt(t[n]));
                      return a.length > 0 && (e[n] = a), e;
                    }, {});
                  }),
                  (n.getPermittedEVMChainsForSelectedTab = function (e, t) {
                    return Bt(e, t);
                  }),
                  (n.getPinnedAccountsList = ht),
                  (n.getPreferences = Le),
                  (n.getPreinstalledSnaps = void 0),
                  (n.getQueuedRequestCount = De),
                  (n.getRemoveNftMessage = function (e) {
                    return e.appState.removeNftMessage;
                  }),
                  (n.getRequestState = function (e, t) {
                    var n;
                    return null === (n = e.metamask.pendingApprovals[t]) || void 0 === n
                      ? void 0
                      : n.requestState;
                  }),
                  (n.getRequestType = function (e, t) {
                    var n;
                    return null === (n = e.metamask.pendingApprovals[t]) || void 0 === n
                      ? void 0
                      : n.type;
                  }),
                  (n.getRequestingNetworkInfo = function (e, t) {
                    let n = t === undefined ? [] : t;
                    'string' == typeof n && (n = [n]);
                    const a = n.flat();
                    return Object.values((0, _.getNetworkConfigurationsByChainId)(e)).filter(e =>
                      a.includes(e.chainId)
                    );
                  }),
                  (n.getRpcPrefsForCurrentProvider = Ze),
                  (n.getSelectedAccount = void 0),
                  (n.getSelectedAccountCachedBalance = he),
                  (n.getSelectedAccountNativeTokenCachedBalanceByChainId = Se),
                  (n.getSelectedAccountTokensAcrossChains = function (e) {
                    const { allTokens: t } = e.metamask,
                      n = ue(e).address,
                      a = {},
                      r = Se(e);
                    return (
                      new Set([...Object.keys(t || {}), ...Object.keys(r || {})]).forEach(o => {
                        var s;
                        a[o] || (a[o] = []),
                          null !== (s = t[o]) &&
                            void 0 !== s &&
                            s[n] &&
                            t[o][n].forEach(e => {
                              const t = { ...e, chainId: o, isNative: !1 };
                              a[o].push(t);
                            });
                        const i = r[o];
                        if (i) {
                          const t = Ae(e, o);
                          a[o].push({ ...t, address: '', balance: i, chainId: o, isNative: !0 });
                        }
                      }),
                      a
                    );
                  }),
                  (n.getSelectedAddress = oe),
                  (n.getSelectedEvmInternalAccount = void 0),
                  (n.getSelectedInternalAccountWithBalance = function (e) {
                    const t = (0, Q.getSelectedInternalAccount)(e),
                      n = me(e)[t.address];
                    return { ...t, balance: n ? n.balance : '0x0' };
                  }),
                  (n.getSelectedNetwork = n.getSelectedKeyringByIdOrDefault = void 0),
                  (n.getSendInputCurrencySwitched = function ({ appState: e }) {
                    return e.sendInputCurrencySwitched;
                  }),
                  (n.getSettingsPageSnapsIds = n.getSettingsPageSnaps = void 0),
                  (n.getShouldHideZeroBalanceTokens = function (e) {
                    const { hideZeroBalanceTokens: t } = Le(e);
                    return t;
                  }),
                  (n.getShouldShowAggregatedBalancePopover = function (e) {
                    const { shouldShowAggregatedBalancePopover: t } = Le(e);
                    return t;
                  }),
                  (n.getShouldShowFiat = function (e) {
                    const t = (0, _.getCurrentChainId)(e),
                      n = N.TEST_NETWORK_IDS.includes(t),
                      { showFiatInTestnets: a } = Le(e),
                      r = (0, b.getConversionRate)(e),
                      o = vt(e),
                      s = Boolean(o && r);
                    if (n) return a && s;
                    return s;
                  }),
                  (n.getShowAccountBanner = function (e) {
                    return e.metamask.showAccountBanner;
                  }),
                  (n.getShowBasicFunctionalityModal = function (e) {
                    return e.appState.showBasicFunctionalityModal;
                  }),
                  (n.getShowBetaHeader = function (e) {
                    return e.metamask.showBetaHeader;
                  }),
                  (n.getShowDataDeletionErrorModal = function (e) {
                    return e.appState.showDataDeletionErrorModal;
                  }),
                  (n.getShowDeleteMetaMetricsDataModal = function (e) {
                    return e.appState.showDeleteMetaMetricsDataModal;
                  }),
                  (n.getShowExtensionInFullSizeView = function (e) {
                    const { showExtensionInFullSizeView: t } = Le(e);
                    return Boolean(t);
                  }),
                  (n.getShowFiatInTestnets = function (e) {
                    const { showFiatInTestnets: t } = Le(e);
                    return t;
                  }),
                  (n.getShowNetworkBanner = function (e) {
                    return e.metamask.showNetworkBanner;
                  }),
                  (n.getShowOutdatedBrowserWarning = function (e) {
                    const { outdatedBrowserWarningLastShown: t } = e.metamask;
                    if (!t) return !0;
                    return new Date().getTime() - t >= 2 * P.DAY;
                  }),
                  (n.getShowPermissionsTour = function (e) {
                    return e.metamask.showPermissionsTour;
                  }),
                  (n.getShowPermittedNetworkToastOpen = function (e) {
                    return e.appState.showPermittedNetworkToastOpen;
                  }),
                  (n.getShowRecoveryPhraseReminder = function (e) {
                    const {
                        recoveryPhraseReminderLastShown: t,
                        recoveryPhraseReminderHasBeenShown: n,
                      } = e.metamask,
                      a = new Date().getTime(),
                      r = n ? 90 * P.DAY : 2 * P.DAY;
                    return a - t >= r;
                  }),
                  (n.getShowTermsOfUse = function (e) {
                    const { termsOfUseLastAgreed: t } = e.metamask;
                    if (!t) return !0;
                    return new Date(t).getTime() < new Date(M.TERMS_OF_USE_LAST_UPDATED).getTime();
                  }),
                  (n.getShowTestNetworks = Ue),
                  (n.getShowWhatsNewPopup = function (e) {
                    return e.appState.showWhatsNewPopup;
                  }),
                  (n.getSignatureInsightSnaps = n.getSignatureInsightSnapIds = void 0),
                  (n.getSlides = function (e) {
                    return e.metamask.slides || [];
                  }),
                  (n.getSnapInsights = n.getSnap = void 0),
                  (n.getSnapInstallOrUpdateRequests = zt),
                  (n.getSnapMetadata = n.getSnapLatestVersion = void 0),
                  (n.getSnapRegistry = function (e) {
                    const { snapRegistryList: t } = e.metamask;
                    return t;
                  }),
                  (n.getSnapRegistryData = void 0),
                  (n.getSnaps = gt),
                  (n.getSnapsInstallPrivacyWarningShown = function (e) {
                    const { snapsInstallPrivacyWarningShown: t } = e.metamask;
                    if (t === undefined || null === t) return !1;
                    return t;
                  }),
                  (n.getSnapsList = Dt),
                  (n.getSnapsMetadata = void 0),
                  (n.getSortedAnnouncementsToShow = function (e) {
                    const t = Object.values(e.metamask.announcements),
                      n = { [F.NOTIFICATION_SOLANA_ON_METAMASK]: !0 },
                      a = t.filter(e => !e.isShown && n[e.id]);
                    return a.sort((e, t) => new Date(t.date) - new Date(e.date));
                  }),
                  (n.getSubjectMetadata = Wt),
                  (n.getSubjectMetadataDeepEqual = void 0),
                  (n.getSubjectsWithPermission = function (e, t) {
                    const n = Mt(e),
                      a = [];
                    return (
                      Object.entries(n).forEach(([n, { permissions: r }]) => {
                        if (r[t]) {
                          const { extensionId: t, name: r, iconUrl: o } = We(e, n) || {};
                          a.push({ extensionId: t, origin: n, name: r, iconUrl: o });
                        }
                      }),
                      a
                    );
                  }),
                  (n.getSubjectsWithSnapPermission = function (e, t) {
                    const n = Mt(e);
                    return Object.entries(n)
                      .filter(([e, { permissions: n }]) => {
                        var a;
                        return null === (a = n[p.WALLET_SNAP_PERMISSION_KEY]) || void 0 === a
                          ? void 0
                          : a.caveats[0].value[t];
                      })
                      .map(([t, n]) => {
                        const { extensionId: a, name: r, iconUrl: o } = We(e, t) || {};
                        return { extensionId: a, origin: t, name: r, iconUrl: o };
                      });
                  }),
                  (n.getSuggestedNfts = function (e) {
                    var t;
                    return (
                      (null === (t = Pe(e)) || void 0 === t
                        ? void 0
                        : t.filter(({ requestData: e, type: t }) => {
                            var n;
                            return (
                              t === s.ApprovalType.WatchAsset &&
                              (null == e || null === (n = e.asset) || void 0 === n
                                ? void 0
                                : n.tokenId) !== undefined
                            );
                          })) || []
                    );
                  }),
                  (n.getSuggestedTokens = function (e) {
                    var t;
                    return (
                      (null === (t = Pe(e)) || void 0 === t
                        ? void 0
                        : t.filter(({ type: e, requestData: t }) => {
                            var n;
                            return (
                              e === s.ApprovalType.WatchAsset &&
                              (null == t || null === (n = t.asset) || void 0 === n
                                ? void 0
                                : n.tokenId) === undefined
                            );
                          })) || []
                    );
                  }),
                  (n.getSwapsDefaultToken = function (e, t = null) {
                    const n = Ie(e),
                      a = null == n ? void 0 : n.balance,
                      r = (0, _.getCurrentChainId)(e),
                      o = t ?? r;
                    return {
                      ...y.SWAPS_CHAINID_DEFAULT_TOKEN_MAP[o],
                      balance: (0, U.hexToDecimal)(a),
                      string: (0, U.getValueFromWeiHex)({
                        value: a,
                        numberOfDecimals: 4,
                        toDenomination: 'ETH',
                      }),
                    };
                  }),
                  (n.getSwitchedNetworkDetails = function (e) {
                    const { switchedNetworkDetails: t } = e.metamask,
                      n = (0, _.getNetworkConfigurationsByChainId)(e);
                    if (t) {
                      const e = Object.values(n).find(e =>
                        e.rpcEndpoints.some(e => e.networkClientId === t.networkClientId)
                      );
                      return {
                        nickname: null == e ? void 0 : e.name,
                        imageUrl:
                          N.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[null == e ? void 0 : e.chainId],
                        origin: null == t ? void 0 : t.origin,
                      };
                    }
                    return null;
                  }),
                  (n.getTargetAccount = function (e, t) {
                    return re(e)[t];
                  }),
                  (n.getTargetAccountWithSendEtherInfo = function (e, t) {
                    const n = we(e);
                    return (0, R.getAccountByAddress)(n, t);
                  }),
                  (n.getTargetSubjectMetadata = We),
                  (n.getTestNetworkBackgroundColor = function (e) {
                    const t = (0, _.getProviderConfig)(e).ticker;
                    switch (!0) {
                      case null == t ? void 0 : t.includes(N.GOERLI_DISPLAY_NAME):
                        return q.BackgroundColor.goerli;
                      case null == t ? void 0 : t.includes(N.SEPOLIA_DISPLAY_NAME):
                        return q.BackgroundColor.sepolia;
                      default:
                        return undefined;
                    }
                  }),
                  (n.getTheme = function (e) {
                    return e.metamask.theme;
                  }),
                  (n.getTokenSortConfig =
                    n.getTokenNetworkFilter =
                    n.getTokenList =
                    n.getTokenExchangeRates =
                    n.getTokenDetectionSupportNetworkByChainId =
                    n.getThirdPartyNotifySnaps =
                      void 0),
                  (n.getTokensAcrossChainsByAccountAddress = fe),
                  (n.getTokensMarketData = n.getTokensAcrossChainsByAccountAddressSelector =
                    void 0),
                  (n.getTotalUnapprovedCount = function (e) {
                    return e.metamask.pendingApprovalCount ?? 0;
                  }),
                  (n.getTxData = n.getTransaction = void 0),
                  (n.getUSDConversionRate = function (e) {
                    var t;
                    return null ===
                      (t = e.metamask.currencyRates[(0, _.getProviderConfig)(e).ticker]) ||
                      void 0 === t
                      ? void 0
                      : t.usdConversionRate;
                  }),
                  (n.getUnapprovedConfirmations = n.getUSDConversionRateByChainId = void 0),
                  (n.getUnapprovedTemplatedConfirmations = Me),
                  (n.getUnapprovedTransaction = void 0),
                  (n.getUnapprovedTxCount = function (e) {
                    const t = (0, z.getUnapprovedTransactions)(e);
                    return Object.keys(t).length;
                  }),
                  (n.getUnconnectedAccounts = function (e, t) {
                    const n = _e(e),
                      a = $t(e, t);
                    return n.filter(e => !a.some(t => t.address === e.address));
                  }),
                  (n.getUpdatedAndSortedAccountsWithCaipAccountId = n.getUpdatedAndSortedAccounts =
                    void 0),
                  (n.getUseBlockie = function (e) {
                    return Boolean(e.metamask.useBlockie);
                  }),
                  (n.getUseCurrencyRateCheck = vt),
                  (n.getUseExternalNameSources = function (e) {
                    return e.metamask.useExternalNameSources;
                  }),
                  (n.getUseExternalServices = et),
                  (n.getUseNftDetection = function (e) {
                    return Boolean(e.metamask.useNftDetection);
                  }),
                  (n.getUseTokenDetection = Ct),
                  (n.getUseTransactionSimulations = function (e) {
                    return Boolean(e.metamask.useTransactionSimulations);
                  }),
                  (n.getWatchedToken = void 0),
                  (n.getWeb3ShimUsageStateForOrigin = function (e, t) {
                    return e.metamask.web3ShimUsageOrigins[t];
                  }),
                  (n.getsnapsAddSnapAccountModalDismissed = function (e) {
                    const { snapsAddSnapAccountModalDismissed: t } = e.metamask;
                    return t;
                  }),
                  (n.isAccountConnectedToCurrentTab = void 0),
                  (n.isBalanceCached = function (e) {
                    var t;
                    const { address: n } = (0, Q.getSelectedInternalAccount)(e),
                      a = null === (t = me(e)[n]) || void 0 === t ? void 0 : t.balance,
                      r = he(e);
                    return Boolean(!a && r);
                  }),
                  (n.isCurrentProviderCustom = function (e) {
                    const t = (0, _.getProviderConfig)(e);
                    return (
                      t.type === N.NETWORK_TYPES.RPC &&
                      !Object.values(N.CHAIN_IDS).includes(t.chainId)
                    );
                  }),
                  (n.isHardwareWallet = te),
                  (n.useSafeChainsListValidationSelector =
                    n.selectNftsByChainId =
                    n.selectNetworkIdentifierByChainId =
                    n.selectNetworkConfigurationByChainId =
                    n.selectInstalledSnaps =
                    n.selectERC20TokensByChain =
                    n.selectERC20Tokens =
                    n.selectDefaultRpcEndpointByChainId =
                    n.selectConversionRateByChainId =
                    n.selectAllTokensFlat =
                    n.rawStateSelector =
                      void 0);
                var a,
                  r = e('punycode/punycode.js'),
                  o = e('@metamask/permission-controller'),
                  s = e('@metamask/controller-utils'),
                  i = e('@metamask/snaps-utils'),
                  c = e('lodash'),
                  u = (a = e('semver')) && a.__esModule ? a : { default: a },
                  d = e('reselect'),
                  l = e('@metamask/name-controller'),
                  g = e('@metamask/transaction-controller'),
                  T = e('@metamask/keyring-api'),
                  m = e('@metamask/network-controller'),
                  p = e('@metamask/snaps-rpc-methods'),
                  S = e('@metamask/chain-agnostic-permission'),
                  E = e('@metamask/keyring-controller'),
                  f = e('@metamask/bridge-controller'),
                  A = e('@metamask/utils'),
                  _ = e('../../shared/modules/selectors/networks'),
                  h = e('../../app/scripts/lib/util'),
                  N = e('../../shared/constants/network'),
                  k = e('../../shared/constants/hardware-wallets'),
                  I = e('../../shared/constants/keyring'),
                  C = e('../../shared/constants/labels'),
                  y = e('../../shared/constants/swaps'),
                  w = e('../../shared/constants/bridge'),
                  O = e('../../shared/constants/transaction'),
                  R = e('../helpers/utils/util'),
                  v = e('../pages/confirmations/confirmation/templates'),
                  D = e('../../shared/constants/tokens'),
                  P = e('../../shared/constants/time'),
                  M = e('../../shared/constants/terms'),
                  b = e('../ducks/metamask/metamask'),
                  B = e('../ducks/app/app'),
                  L = e('../../shared/modules/string-utils'),
                  U = e('../../shared/modules/conversion.utils'),
                  q = e('../helpers/constants/design-system'),
                  F = e('../../shared/notifications'),
                  H = e('../../shared/constants/app'),
                  W = e('../../shared/constants/multichain/assets'),
                  G = e('../../shared/modules/transaction.utils'),
                  K = e('../../shared/modules/hexstring-utils'),
                  x = e('../../shared/modules/selectors/util'),
                  j = e(
                    '../../shared/lib/multichain/chain-agnostic-permission-utils/caip-chainids'
                  ),
                  V = e(
                    '../../shared/lib/multichain/chain-agnostic-permission-utils/caip-accounts'
                  ),
                  Y = e('../../shared/lib/multichain/chain-agnostic-permission-utils/misc-utils'),
                  $ = e('../helpers/utils/snaps'),
                  z = e('./transactions'),
                  Q = e('./accounts'),
                  X = e('./multichain'),
                  Z = e('./remote-feature-flags'),
                  J = e('./approvals');
                n.getConfirmationExchangeRates = e => e.appState.confirmationExchangeRates;
                function ee(e) {
                  const t = (0, Q.getSelectedInternalAccount)(e);
                  return t ? t.metadata.keyring : null;
                }
                function te(e) {
                  var t;
                  const n = ee(e);
                  return Boolean(
                    null == n || null === (t = n.type) || void 0 === t
                      ? void 0
                      : t.includes('Hardware')
                  );
                }
                function ne(e) {
                  return ae(ee(e));
                }
                function ae(e) {
                  if (!e) return '';
                  const { type: t } = e;
                  switch (t) {
                    case I.KeyringType.trezor:
                    case I.KeyringType.oneKey:
                    case I.KeyringType.ledger:
                    case I.KeyringType.lattice:
                    case I.KeyringType.qr:
                      return 'hardware';
                    case I.KeyringType.imported:
                      return 'imported';
                    case I.KeyringType.snap:
                      return 'snap';
                    default:
                      return 'default';
                  }
                }
                n.getPendingTokens = e => e.appState.pendingTokens;
                const re = (n.getMetaMaskAccounts = (0, x.createDeepEqualSelector)(
                  Q.getInternalAccounts,
                  me,
                  pe,
                  X.getMultichainBalances,
                  X.getMultichainNetworkProviders,
                  _.getCurrentChainId,
                  (e, t) => t,
                  (e, t, n, a, r, o, s) =>
                    Object.values(e).reduce((e, i) => {
                      let c = i;
                      if (s === undefined || o === s) {
                        if ((0, T.isEvmAccountType)(i.type))
                          null != t && t[i.address] && (c = { ...c, ...t[i.address] });
                        else {
                          var u;
                          const e = r.find(e => e.isAddressCompatible(i.address));
                          c = {
                            ...c,
                            balance:
                              (null == a ||
                              null === (u = a[i.id]) ||
                              void 0 === u ||
                              null === (u = u[W.MULTICHAIN_NETWORK_TO_ASSET_TYPES[e.chainId]]) ||
                              void 0 === u
                                ? void 0
                                : u.amount) ?? '0',
                          };
                        }
                        (null !== c.balance && c.balance !== undefined) ||
                          (c = { ...c, balance: (n && n[i.address]) ?? '0x0' });
                      } else c = { ...c, balance: (n && n[i.address]) ?? '0x0' };
                      return { ...e, [i.address]: c };
                    }, {})
                ));
                function oe(e) {
                  var t;
                  return null === (t = (0, Q.getSelectedInternalAccount)(e)) || void 0 === t
                    ? void 0
                    : t.address;
                }
                const se = (n.getInternalAccountByAddress = (0, d.createSelector)(
                  e => e.metamask.internalAccounts.accounts,
                  (e, t) => t,
                  (e, t) => Object.values(e).find(e => (0, L.isEqualCaseInsensitive)(e.address, t))
                ));
                function ie(e, t) {
                  return e.metamask.internalAccounts.accounts[t];
                }
                const ce = (n.getEvmInternalAccounts = (0, d.createSelector)(
                    Q.getInternalAccounts,
                    e => e.filter(e => (0, T.isEvmAccountType)(e.type))
                  )),
                  ue = (n.getSelectedEvmInternalAccount = (0, d.createSelector)(ce, e => {
                    const [t] = (0, R.sortSelectedInternalAccounts)(e);
                    return t;
                  })),
                  de = (n.getInternalAccountsSortedByKeyring = (0, x.createDeepEqualSelector)(
                    ge,
                    re,
                    (e, t) =>
                      e
                        .map(({ accounts: e }) => e)
                        .flat()
                        .map(e => t[e])
                  ));
                function le(e) {
                  const { tokens: t } = e.metamask;
                  return t ? t.length : 0;
                }
                function ge(e) {
                  return e.metamask.keyrings.map((t, n) => {
                    var a;
                    return {
                      ...t,
                      metadata:
                        (null === (a = e.metamask.keyringsMetadata) || void 0 === a
                          ? void 0
                          : a[n]) ?? {},
                    };
                  });
                }
                const Te = (n.getMetaMaskHdKeyrings = (0, d.createSelector)(ge, e =>
                  e.filter(e => e.type === E.KeyringTypes.hd)
                ));
                function me(e) {
                  return e.metamask.accounts;
                }
                function pe(e, t) {
                  var n;
                  const a = t ?? (0, _.getCurrentChainId)(e);
                  return null !== (n = e.metamask.accountsByChainId) && void 0 !== n && n[a]
                    ? Object.entries(e.metamask.accountsByChainId[a]).reduce(
                        (e, [t, n]) => ((e[t] = n.balance), e),
                        {}
                      )
                    : {};
                }
                function Se(e) {
                  const { accountsByChainId: t } = e.metamask,
                    { address: n } = ue(e),
                    a = {};
                  for (const [e, r] of Object.entries(t || {})) r[n] && (a[e] = r[n].balance);
                  return a;
                }
                (n.getNativeTokenCachedBalanceByChainIdSelector = (0, d.createSelector)(
                  e => e,
                  (e, t) => t,
                  (e, t) => Ee(e, t)
                )),
                  (n.getTokensAcrossChainsByAccountAddressSelector = (0, d.createSelector)(
                    e => e,
                    (e, t) => t,
                    (e, t) => fe(e, t)
                  ));
                function Ee(e, t) {
                  const { accountsByChainId: n } = e.metamask,
                    a = {};
                  for (const [e, r] of Object.entries(n || {})) r[t] && (a[e] = r[t].balance);
                  return a;
                }
                function fe(e, t) {
                  const { allTokens: n } = e.metamask,
                    a = {},
                    r = Ee(e, t);
                  return (
                    new Set([...Object.keys(n || {}), ...Object.keys(r || {})]).forEach(o => {
                      var s;
                      a[o] || (a[o] = []),
                        null !== (s = n[o]) &&
                          void 0 !== s &&
                          s[t] &&
                          n[o][t].forEach(e => {
                            const t = { ...e, chainId: o, isNative: !1 };
                            a[o].push(t);
                          });
                      const i = r[o];
                      if (i) {
                        const t = Ae(e, o);
                        a[o].push({
                          ...t,
                          address: '',
                          balance: i,
                          chainId: o,
                          isNative: !0,
                          image: nt(o),
                        });
                      }
                    }),
                    a
                  );
                }
                function Ae(e, t) {
                  const { networkConfigurationsByChainId: n } = e.metamask,
                    a = null == n ? void 0 : n[t];
                  if (a) {
                    return {
                      symbol: a.nativeCurrency || O.AssetType.native,
                      decimals: 18,
                      name: a.name || 'Native Token',
                    };
                  }
                  const { provider: r } = e.metamask;
                  if ((null == r ? void 0 : r.chainId) === t) {
                    var o;
                    return {
                      symbol: r.ticker || O.AssetType.native,
                      decimals:
                        (null === (o = r.nativeCurrency) || void 0 === o ? void 0 : o.decimals) ||
                        18,
                      name: r.nickname || 'Native Token',
                    };
                  }
                  const s = N.CHAIN_ID_TO_CURRENCY_SYMBOL_MAP[t],
                    i = N.NETWORK_TO_NAME_MAP[t];
                  return s && i
                    ? { symbol: s, decimals: 18, name: i }
                    : { symbol: O.AssetType.native, decimals: 18, name: 'Native Token' };
                }
                const _e = (n.getMetaMaskAccountsOrdered = (0, x.createDeepEqualSelector)(
                  de,
                  re,
                  (e, t) => e.map(e => ({ ...e, ...t[e.address] }))
                ));
                n.getMetaMaskAccountsConnected = (0, d.createSelector)(_e, e =>
                  e.map(({ address: e }) => e.toLowerCase())
                );
                function he(e) {
                  const t = pe(e),
                    { address: n } = (0, Q.getSelectedInternalAccount)(e);
                  return null == t ? void 0 : t[n];
                }
                function Ne(e) {
                  return e.metamask.allTokens;
                }
                n.selectAllTokensFlat = (0, d.createSelector)(Ne, e =>
                  Object.values(e).reduce((e, t) => {
                    const n = Object.values(t);
                    return e.concat(...n);
                  }, [])
                );
                function ke(e) {
                  return e.metamask.domains;
                }
                const Ie = (n.getSelectedAccount = (0, x.createDeepEqualSelector)(
                  re,
                  Q.getSelectedInternalAccount,
                  (e, t) => (t ? { ...t, ...e[t.address] } : undefined)
                ));
                n.getWatchedToken = e =>
                  (0, d.createSelector)([Ie, Ne], (t, n) => {
                    var a;
                    const { chainId: r } = e;
                    return null == n ||
                      null === (a = n[r]) ||
                      void 0 === a ||
                      null === (a = a[t.address]) ||
                      void 0 === a
                      ? void 0
                      : a.find(
                          t =>
                            (0, K.toChecksumHexAddress)(t.address) ===
                            (0, K.toChecksumHexAddress)(e.txParams.to)
                        );
                  });
                n.getTokenExchangeRates = (0, d.createSelector)(
                  e => (0, _.getCurrentChainId)(e),
                  e => e.metamask.marketData,
                  (e, t) => {
                    const n = (null == t ? void 0 : t[e]) ?? {};
                    return Object.entries(n).reduce(
                      (e, [t, n]) => ((e[t] = (null == n ? void 0 : n.price) ?? null), e),
                      {}
                    );
                  }
                );
                n.getCrossChainTokenExchangeRates = e => {
                  const t = e.metamask.marketData ?? {};
                  return Object.keys(t).reduce(
                    (e, n) => (
                      (e[n] = Object.keys(t[n]).reduce((e, a) => {
                        var r;
                        return (
                          (e[a] = null === (r = t[n][a]) || void 0 === r ? void 0 : r.price), e
                        );
                      }, {})),
                      e
                    ),
                    {}
                  );
                };
                n.getTokensMarketData = e => {
                  var t;
                  const n = (0, _.getCurrentChainId)(e);
                  return null === (t = e.metamask.marketData) || void 0 === t ? void 0 : t[n];
                };
                function Ce(e) {
                  const t = (0, _.getCurrentChainId)(e);
                  return e.metamask.addressBook[t] ? Object.values(e.metamask.addressBook[t]) : [];
                }
                function ye(e, t) {
                  return Ce(e).find(e => (0, L.isEqualCaseInsensitive)(e.address, t));
                }
                function we(e) {
                  const t = re(e),
                    n = (0, Q.getInternalAccounts)(e);
                  return Object.values(n).map(e => ({ ...e, ...t[e.address] }));
                }
                function Oe(e) {
                  const { address: t } = (0, Q.getSelectedInternalAccount)(e),
                    n = we(e);
                  return (0, R.getAccountByAddress)(n, t);
                }
                n.getMarketData = e => e.metamask.marketData;
                n.getNetworkConfigurationIdByChainId = (0, x.createDeepEqualSelector)(
                  e => e.metamask.networkConfigurationsByChainId,
                  e =>
                    Object.entries(e).reduce((e, [t, n]) => {
                      const a = n.rpcEndpoints[n.defaultRpcEndpointIndex];
                      return (e[t] = a.networkClientId), e;
                    }, {})
                );
                const Re = (n.selectNetworkConfigurationByChainId = (0, d.createSelector)(
                    _.getNetworkConfigurationsByChainId,
                    (e, t) => t,
                    (e, t) => e[t]
                  )),
                  ve = (n.selectDefaultRpcEndpointByChainId = (0, d.createSelector)(Re, e => {
                    if (!e) return undefined;
                    const { defaultRpcEndpointIndex: t, rpcEndpoints: n } = e;
                    return n[t];
                  }));
                (n.selectConversionRateByChainId = (0, d.createSelector)(
                  Re,
                  e => e,
                  (e, t) => {
                    var n;
                    if (!e) return undefined;
                    const { nativeCurrency: a } = e;
                    return null === (n = t.metamask.currencyRates[a]) || void 0 === n
                      ? void 0
                      : n.conversionRate;
                  }
                )),
                  (n.selectNftsByChainId = (0, d.createSelector)(
                    Q.getSelectedInternalAccount,
                    e => e.metamask.allNfts,
                    (e, t) => t,
                    (e, t, n) => {
                      var a;
                      return (
                        (null == t || null === (a = t[e.address]) || void 0 === a
                          ? void 0
                          : a[n]) ?? []
                      );
                    }
                  )),
                  (n.selectNetworkIdentifierByChainId = (0, d.createSelector)(Re, ve, (e, t) => {
                    const { name: n } = e ?? {},
                      { url: a, networkClientId: r } = t ?? {};
                    return n || a || r;
                  }));
                function De(e) {
                  return e.metamask.queuedRequestCount ?? 0;
                }
                const Pe = (n.getUnapprovedConfirmations = (0, x.createDeepEqualSelector)(
                  e => e.metamask.pendingApprovals || {},
                  e => Object.values(e)
                ));
                function Me(e) {
                  return Pe(e).filter(e =>
                    v.TEMPLATED_CONFIRMATION_APPROVAL_TYPES.includes(e.type)
                  );
                }
                function be(e) {
                  return (0, _.getCurrentChainId)(e) === N.CHAIN_IDS.MAINNET;
                }
                function Be(e) {
                  const t = (0, _.getCurrentChainId)(e);
                  return N.TEST_CHAINS.includes(t);
                }
                function Le({ metamask: e }) {
                  return e.preferences ?? {};
                }
                function Ue(e) {
                  const { showTestNetworks: t } = Le(e);
                  return Boolean(t);
                }
                n.getTokenSortConfig = (0, x.createDeepEqualSelector)(
                  Le,
                  ({ tokenSortConfig: e }) => e
                );
                const qe = (n.getTokenNetworkFilter = (0, x.createDeepEqualSelector)(
                  _.getCurrentChainId,
                  Le,
                  (e, { tokenNetworkFilter: t }) =>
                    N.FEATURED_NETWORK_CHAIN_IDS.includes(e)
                      ? Object.entries(t || {}).reduce(
                          (e, [t, n]) => (
                            N.FEATURED_NETWORK_CHAIN_IDS.includes(t) && (e[t] = n), e
                          ),
                          {}
                        )
                      : { [e]: !0 }
                ));
                function Fe(e) {
                  const t = (0, _.getCurrentChainId)(e),
                    n = qe(e);
                  return 1 === Object.keys(n).length && Object.keys(n)[0] === t;
                }
                const He = (0, c.memoize)(e => `data:image/svg+xml;utf8,${encodeURIComponent(e)}`);
                function We(e, t) {
                  const n = Wt(e)[t];
                  if ((null == n ? void 0 : n.subjectType) === o.SubjectType.Snap) {
                    const { svgIcon: e, ...t } = n;
                    return { ...t, iconUrl: e ? He(e) : null };
                  }
                  return n;
                }
                const Ge = e => e;
                n.rawStateSelector = Ge;
                const Ke = (e, t) => t,
                  xe = e => e.metamask.snaps;
                n.selectInstalledSnaps = xe;
                const je = (n.getSnapRegistryData = (0, d.createSelector)(
                    [
                      e => {
                        var t;
                        return null === (t = e.metamask.database) || void 0 === t
                          ? void 0
                          : t.verifiedSnaps;
                      },
                      Ke,
                    ],
                    (e, t) => (e ? e[t] : null)
                  )),
                  Ve = (n.getSnapLatestVersion = (0, d.createSelector)([je], e =>
                    e
                      ? Object.keys(e.versions).reduce(
                          (e, t) => (u.default.gt(t, e) ? t : e),
                          '0.0.0'
                        )
                      : null
                  )),
                  Ye = (n.getAllSnapAvailableUpdates = (0, d.createSelector)([xe, Ge], (e, t) => {
                    const n = new Map();
                    return (
                      Object.keys(e).forEach(a => {
                        const r = Ve(t, a);
                        n.set(a, !!r && u.default.gt(r, e[a].version));
                      }),
                      n
                    );
                  })),
                  $e =
                    ((n.getAnySnapUpdateAvailable = (0, d.createSelector)([Ye], e =>
                      [...e.values()].some(e => !0 === e)
                    )),
                    (n.getHideSnapBranding = (0, x.createDeepEqualSelector)([xe, Ke], (e, t) => {
                      var n;
                      return null === (n = e[t]) || void 0 === n ? void 0 : n.hideSnapBranding;
                    })),
                    (n.getMemoizedTargetSubjectMetadata = (0, x.createDeepEqualSelector)(
                      We,
                      e => e
                    )),
                    (n.getMemoizedUnapprovedConfirmations = (0, x.createDeepEqualSelector)(
                      Pe,
                      e => e
                    )),
                    (n.getMemoizedUnapprovedTemplatedConfirmations = (0, x.createDeepEqualSelector)(
                      Me,
                      e => e
                    )),
                    (e, t) => t),
                  ze = (n.getMemoizedInterfaces = (0, x.createDeepEqualSelector)(
                    e => e.metamask.interfaces,
                    e => e
                  )),
                  Qe = (n.getInterface = (0, d.createSelector)([ze, $e], (e, t) => e[t])),
                  Xe =
                    ((n.getMemoizedInterface = (0, x.createDeepEqualSelector)(Qe, e => e)),
                    (n.getInterfaceContent = (0, d.createSelector)([ze, $e], (e, t) => {
                      var n;
                      return null === (n = e[t]) || void 0 === n ? void 0 : n.content;
                    })));
                (n.getMemoizedInterfaceContent = (0, x.createDeepEqualSelector)(Xe, e => e)),
                  (n.getMultipleTargetsSubjectMetadata = (0, x.createDeepEqualSelector)(
                    [Ge, (e, t) => t],
                    (e, t) => Object.keys(t ?? {}).reduce((t, n) => ((t[n] = We(e, n)), t), {})
                  ));
                function Ze(e) {
                  const { rpcPrefs: t } = (0, _.getProviderConfig)(e);
                  return t;
                }
                function Je(e) {
                  return e.activeTab.origin;
                }
                function et(e) {
                  return e.metamask.useExternalServices;
                }
                function tt(e) {
                  return e.metamask.currencyRates;
                }
                n.getUSDConversionRateByChainId = e =>
                  (0, d.createSelector)(
                    tt,
                    t => Re(t, e),
                    (e, t) => {
                      var n;
                      if (!t) return undefined;
                      const { nativeCurrency: a } = t;
                      return null === (n = e[a]) || void 0 === n ? void 0 : n.usdConversionRate;
                    }
                  );
                n.getIsBridgeEnabled = (0, d.createSelector)(
                  [
                    function (e) {
                      return e.metamask.bridgeFeatureFlags;
                    },
                    et,
                  ],
                  (e, t) => {
                    var n;
                    return (
                      (t &&
                        (null == e ||
                        null === (n = e[f.BridgeFeatureFlagsKey.EXTENSION_CONFIG]) ||
                        void 0 === n
                          ? void 0
                          : n.support)) ??
                      !1
                    );
                  }
                );
                function nt(e) {
                  return N.CHAIN_ID_TOKEN_IMAGE_MAP[e] ?? undefined;
                }
                (n.getMemoizedMetaMaskInternalAccounts = (0, x.createDeepEqualSelector)(
                  Q.getInternalAccounts,
                  e => e
                )),
                  (n.selectERC20TokensByChain = (0, x.createDeepEqualSelector)(
                    e => e.metamask.tokensChainsCache,
                    e => e
                  ));
                const at = (n.selectERC20Tokens = (0, x.createDeepEqualSelector)(
                    e => e.metamask.tokenList,
                    e => e
                  )),
                  rt = (n.getTokenList = (0, d.createSelector)(at, wt, (e, t) =>
                    t ? D.STATIC_MAINNET_TOKEN_LIST : e
                  )),
                  ot = (n.getMemoizedMetadataContract = (0, d.createSelector)(
                    (e, t) => rt(e),
                    (e, t) => t,
                    (e, t) => e[null == t ? void 0 : t.toLowerCase()]
                  )),
                  st =
                    ((n.getMetadataContractName = (0, d.createSelector)(
                      ot,
                      e => (null == e ? void 0 : e.name) ?? ''
                    )),
                    e => e.confirmTransaction.txData);
                n.getTxData = st;
                const it = (n.getUnapprovedTransaction = (0, x.createDeepEqualSelector)(
                    e => (0, z.getUnapprovedTransactions)(e),
                    (e, t) => t,
                    (e, t) => Object.values(e).find(({ id: e }) => e === t)
                  )),
                  ct = (n.getTransaction = (0, x.createDeepEqualSelector)(
                    e => (0, z.getCurrentNetworkTransactions)(e),
                    (e, t) => t,
                    (e, t) => Object.values(e).find(({ id: e }) => e === t) || {}
                  )),
                  ut =
                    ((n.getFullTxData = (0, x.createDeepEqualSelector)(
                      st,
                      (e, t, n) =>
                        n === g.TransactionStatus.unapproved ? (it(e, t) ?? {}) : ct(e, t),
                      (e, t, n, a, r) => ({ customTxParamsData: a, hexTransactionAmount: r }),
                      (e, t, { customTxParamsData: n, hexTransactionAmount: a }) => {
                        let r = { ...e, ...t };
                        return (
                          t && t.simulationFails && (r.simulationFails = { ...t.simulationFails }),
                          n && (r = { ...r, txParams: { ...r.txParams, data: n } }),
                          a && (r = { ...r, txParams: { ...r.txParams, value: a } }),
                          r
                        );
                      }
                    )),
                    (n.getConnectedSubjectsForAllAddresses = (0, x.createDeepEqualSelector)(
                      Mt,
                      Wt,
                      (e, t) => {
                        const n = {};
                        return (
                          Object.entries(e).forEach(([e, a]) => {
                            Kt(a).forEach(a => {
                              n[a] || (n[a] = []);
                              const r = t[e];
                              n[a].push({ origin: e, ...r });
                            });
                          }),
                          n
                        );
                      }
                    ))),
                  dt = (n.getAllConnectedAccounts = (0, x.createDeepEqualSelector)(ut, e =>
                    Object.keys(e)
                  )),
                  lt = (n.getConnectedSitesList = (0, x.createDeepEqualSelector)(
                    ut,
                    Q.getInternalAccounts,
                    dt,
                    (e, t, n) => {
                      const a = {};
                      return (
                        n.forEach(n => {
                          e[n].forEach(e => {
                            const r = e.origin,
                              o = t.find(e => (0, L.isEqualCaseInsensitive)(e.address, n));
                            a[r]
                              ? (a[r].addresses.push(n),
                                (a[r].addressToNameMap[n] =
                                  (null == o ? void 0 : o.metadata.name) || ''))
                              : (a[r] = {
                                  ...e,
                                  addresses: [n],
                                  addressToNameMap: {
                                    [n]: (null == o ? void 0 : o.metadata.name) || '',
                                  },
                                });
                          });
                        }),
                        a
                      );
                    }
                  ));
                (n.getConnectedSnapsList = (0, x.createDeepEqualSelector)(Dt, e => {
                  const t = {};
                  return (
                    Object.values(e).forEach(e => {
                      t[e.name] || (t[e.name] = e);
                    }),
                    t
                  );
                })),
                  (n.getMemoizedCurrentChainId = (0, x.createDeepEqualSelector)(
                    _.getCurrentChainId,
                    e => e
                  ));
                function gt(e) {
                  return e.metamask.snaps;
                }
                function Tt(e) {
                  return e.metamask.currentLocale;
                }
                n.getSnap = (0, x.createDeepEqualSelector)(
                  gt,
                  (e, t) => t,
                  (e, t) => e[t]
                );
                const mt = (n.getSnapsMetadata = (0, x.createDeepEqualSelector)(Tt, gt, (e, t) =>
                    Object.values(t).reduce((t, n) => {
                      const a = n.id,
                        r = n.localizationFiles
                          ? (0, i.getLocalizedSnapManifest)(n.manifest, e, n.localizationFiles)
                          : n.manifest;
                      return (
                        (t[a] = {
                          name: r.proposedName,
                          description: r.description,
                          hidden: n.hidden,
                        }),
                        t
                      );
                    }, {})
                  )),
                  pt = (n.getSnapMetadata = (0, x.createDeepEqualSelector)(
                    mt,
                    (e, t) => t,
                    (e, t) => e[t] ?? { name: t ? (0, i.stripSnapPrefix)(t) : null }
                  )),
                  St = (n.getEnabledSnaps = (0, x.createDeepEqualSelector)(gt, e =>
                    Object.values(e).reduce((e, t) => (t.enabled && (e[t.id] = t), e), {})
                  )),
                  Et =
                    ((n.getPreinstalledSnaps = (0, x.createDeepEqualSelector)(gt, e =>
                      Object.values(e).reduce((e, t) => (t.preinstalled && (e[t.id] = t), e), {})
                    )),
                    (n.getInsightSnaps = (0, x.createDeepEqualSelector)(St, Mt, (e, t) =>
                      Object.values(e).filter(({ id: e }) => {
                        var n;
                        return null === (n = t[e]) || void 0 === n
                          ? void 0
                          : n.permissions['endowment:transaction-insight'];
                      })
                    ))),
                  ft = (n.getSettingsPageSnaps = (0, x.createDeepEqualSelector)(St, Mt, (e, t) =>
                    Object.values(e).filter(({ id: e, preinstalled: n }) => {
                      var a;
                      return (
                        (null === (a = t[e]) || void 0 === a
                          ? void 0
                          : a.permissions[p.SnapEndowments.SettingsPage]) &&
                        n &&
                        !(0, $.isSnapIgnoredInProd)(e)
                      );
                    })
                  )),
                  At = (n.getSignatureInsightSnaps = (0, x.createDeepEqualSelector)(
                    St,
                    Mt,
                    (e, t) =>
                      Object.values(e).filter(({ id: e }) => {
                        var n;
                        return null === (n = t[e]) || void 0 === n
                          ? void 0
                          : n.permissions['endowment:signature-insight'];
                      })
                  )),
                  _t =
                    ((n.getSignatureInsightSnapIds = (0, x.createDeepEqualSelector)(At, e =>
                      e.map(e => e.id)
                    )),
                    (n.getInsightSnapIds = (0, x.createDeepEqualSelector)(Et, e =>
                      e.map(e => e.id)
                    )),
                    (n.getNameLookupSnapsIds = (0, x.createDeepEqualSelector)(St, Mt, (e, t) =>
                      Object.values(e)
                        .filter(({ id: e }) => {
                          var n;
                          return null === (n = t[e]) || void 0 === n
                            ? void 0
                            : n.permissions['endowment:name-lookup'];
                        })
                        .map(e => e.id)
                    )),
                    (n.getSettingsPageSnapsIds = (0, x.createDeepEqualSelector)(ft, e =>
                      e.map(e => e.id)
                    )),
                    (n.getNotifySnaps = (0, x.createDeepEqualSelector)(St, Mt, (e, t) =>
                      Object.values(e).filter(({ id: e }) => {
                        var n;
                        return null === (n = t[e]) || void 0 === n
                          ? void 0
                          : n.permissions.snap_notify;
                      })
                    )));
                n.getThirdPartyNotifySnaps = (0, x.createDeepEqualSelector)(_t, e =>
                  e.filter(e => !e.preinstalled)
                );
                n.getSnapInsights = (0, x.createDeepEqualSelector)(
                  function (e) {
                    return e.metamask.insights;
                  },
                  (e, t) => t,
                  (e, t) => (null == e ? void 0 : e[t])
                );
                function ht(e) {
                  return e.metamask.pinnedAccountList;
                }
                function Nt(e) {
                  return e.metamask.hiddenAccountList;
                }
                function kt(e) {
                  const t = (0, z.getAllUnapprovedTransactions)(e),
                    n = De(e),
                    a = {
                      ...t,
                      ...e.metamask.unapprovedDecryptMsgs,
                      ...e.metamask.unapprovedPersonalMsgs,
                      ...e.metamask.unapprovedEncryptionPublicKeyMsgs,
                      ...e.metamask.unapprovedTypedMessages,
                    };
                  return Object.keys(a).length + n;
                }
                const It = (n.getCurrentNetwork = (0, x.createDeepEqualSelector)(
                  _.getNetworkConfigurationsByChainId,
                  _.getCurrentChainId,
                  (e, t) => {
                    var n;
                    const a = e[t],
                      r = a.rpcEndpoints[a.defaultRpcEndpointIndex],
                      o =
                        null === (n = a.blockExplorerUrls) || void 0 === n
                          ? void 0
                          : n[a.defaultBlockExplorerUrlIndex];
                    return {
                      chainId: a.chainId,
                      id: r.networkClientId,
                      nickname: a.name,
                      rpcUrl: r.url,
                      ticker: a.nativeCurrency,
                      blockExplorerUrl: o,
                      rpcPrefs: {
                        blockExplorerUrl: o,
                        imageUrl: N.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[a.chainId],
                      },
                      ...(r.type === m.RpcEndpointType.Infura && {
                        providerType: r.networkClientId,
                      }),
                    };
                  }
                ));
                (n.getSelectedNetwork = (0, x.createDeepEqualSelector)(
                  _.getSelectedNetworkClientId,
                  _.getNetworkConfigurationsByChainId,
                  (e, t) => {
                    if (e === undefined) throw new Error('No network is selected');
                    const n = Object.values(t).find(t =>
                      t.rpcEndpoints.some(t => t.networkClientId === e)
                    );
                    if (n === undefined)
                      throw new Error(
                        'Could not find network configuration for selected network client'
                      );
                    return { configuration: n, clientId: e };
                  }
                )),
                  (n.getConnectedSitesListWithNetworkInfo = (0, x.createDeepEqualSelector)(
                    lt,
                    ke,
                    _.getNetworkConfigurationsByChainId,
                    It,
                    (e, t, n, a) => (
                      Object.keys(e).forEach(r => {
                        const o = Object.values(n).find(e =>
                          e.rpcEndpoints.some(e => e.networkClientId === t[r])
                        );
                        (e[r].networkIconUrl =
                          N.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[null == o ? void 0 : o.chainId] ||
                          ''),
                          (e[r].networkName =
                            (null == o ? void 0 : o.name) ||
                            (null == a ? void 0 : a.nickname) ||
                            '');
                      }),
                      e
                    )
                  ));
                function Ct(e) {
                  return Boolean(e.metamask.useTokenDetection);
                }
                (n.getAllEnabledNetworks = (0, x.createDeepEqualSelector)(
                  _.getNetworkConfigurationsByChainId,
                  Ue,
                  (e, t) =>
                    Object.entries(e).reduce(
                      (e, [n, a]) => ((!t && N.TEST_CHAINS.includes(n)) || (e[n] = a), e),
                      {}
                    )
                )),
                  (n.getAllChainsToPoll = (0, x.createDeepEqualSelector)(
                    _.getNetworkConfigurationsByChainId,
                    _.getCurrentChainId,
                    (e, t) =>
                      Object.keys(e).filter(
                        e => e === t || N.FEATURED_NETWORK_CHAIN_IDS.includes(e)
                      )
                  )),
                  (n.getChainIdsToPoll = (0, x.createDeepEqualSelector)(
                    _.getNetworkConfigurationsByChainId,
                    _.getCurrentChainId,
                    Fe,
                    (e, t, n) =>
                      n
                        ? [t]
                        : Object.keys(e).filter(
                            e => e === t || N.FEATURED_NETWORK_CHAIN_IDS.includes(e)
                          )
                  )),
                  (n.getNetworkClientIdsToPoll = (0, x.createDeepEqualSelector)(
                    _.getNetworkConfigurationsByChainId,
                    _.getCurrentChainId,
                    Fe,
                    (e, t, n) => {
                      if (n) {
                        const n = e[t];
                        return [n.rpcEndpoints[n.defaultRpcEndpointIndex].networkClientId];
                      }
                      return Object.entries(e).reduce(
                        (e, [n, a]) => (
                          (n === t || N.FEATURED_NETWORK_CHAIN_IDS.includes(n)) &&
                            e.push(a.rpcEndpoints[a.defaultRpcEndpointIndex].networkClientId),
                          e
                        ),
                        []
                      );
                    }
                  ));
                function yt(e) {
                  const t = (0, _.getCurrentChainId)(e);
                  return [
                    N.CHAIN_IDS.MAINNET,
                    N.CHAIN_IDS.BSC,
                    N.CHAIN_IDS.POLYGON,
                    N.CHAIN_IDS.AVALANCHE,
                    N.CHAIN_IDS.LINEA_GOERLI,
                    N.CHAIN_IDS.LINEA_SEPOLIA,
                    N.CHAIN_IDS.LINEA_MAINNET,
                    N.CHAIN_IDS.ARBITRUM,
                    N.CHAIN_IDS.OPTIMISM,
                    N.CHAIN_IDS.BASE,
                    N.CHAIN_IDS.ZKSYNC_ERA,
                    N.CHAIN_IDS.CRONOS,
                    N.CHAIN_IDS.CELO,
                    N.CHAIN_IDS.GNOSIS,
                    N.CHAIN_IDS.FANTOM,
                    N.CHAIN_IDS.POLYGON_ZKEVM,
                    N.CHAIN_IDS.MOONBEAM,
                    N.CHAIN_IDS.MOONRIVER,
                  ].includes(t);
                }
                function wt(e) {
                  const t = be(e);
                  return !Ct(e) && t;
                }
                function Ot(e) {
                  const t = (0, _.getCurrentChainId)(e);
                  return !N.CHAIN_ID_TO_RPC_URL_MAP[t];
                }
                n.getTokenDetectionSupportNetworkByChainId = e => {
                  switch ((0, _.getCurrentChainId)(e)) {
                    case N.CHAIN_IDS.MAINNET:
                      return N.MAINNET_DISPLAY_NAME;
                    case N.CHAIN_IDS.BSC:
                      return N.BSC_DISPLAY_NAME;
                    case N.CHAIN_IDS.POLYGON:
                      return N.POLYGON_DISPLAY_NAME;
                    case N.CHAIN_IDS.AVALANCHE:
                      return N.AVALANCHE_DISPLAY_NAME;
                    case N.CHAIN_IDS.LINEA_GOERLI:
                      return N.LINEA_GOERLI_DISPLAY_NAME;
                    case N.CHAIN_IDS.LINEA_SEPOLIA:
                      return N.LINEA_SEPOLIA_DISPLAY_NAME;
                    case N.CHAIN_IDS.LINEA_MAINNET:
                      return N.LINEA_MAINNET_DISPLAY_NAME;
                    case N.CHAIN_IDS.ARBITRUM:
                      return N.ARBITRUM_DISPLAY_NAME;
                    case N.CHAIN_IDS.OPTIMISM:
                      return N.OPTIMISM_DISPLAY_NAME;
                    case N.CHAIN_IDS.BASE:
                      return N.BASE_DISPLAY_NAME;
                    case N.CHAIN_IDS.ZKSYNC_ERA:
                      return N.ZK_SYNC_ERA_DISPLAY_NAME;
                    case N.CHAIN_IDS.CRONOS:
                      return N.CRONOS_DISPLAY_NAME;
                    case N.CHAIN_IDS.CELO:
                      return N.CELO_DISPLAY_NAME;
                    case N.CHAIN_IDS.GNOSIS:
                      return N.GNOSIS_DISPLAY_NAME;
                    case N.CHAIN_IDS.FANTOM:
                      return N.FANTOM_DISPLAY_NAME;
                    case N.CHAIN_IDS.POLYGON_ZKEVM:
                      return N.POLYGON_ZKEVM_DISPLAY_NAME;
                    case N.CHAIN_IDS.MOONBEAM:
                      return N.MOONBEAM_DISPLAY_NAME;
                    case N.CHAIN_IDS.MOONRIVER:
                      return N.MOONRIVER_DISPLAY_NAME;
                    default:
                      return '';
                  }
                };
                const Rt = (n.getUpdatedAndSortedAccounts = (0, x.createDeepEqualSelector)(
                  _e,
                  ht,
                  Nt,
                  Yt,
                  (e, t, n, a) => {
                    a.forEach(t => {
                      const n = e.find(e => e.id === t.id);
                      n &&
                        t.metadata &&
                        ((n.connections = !0), (n.lastSelected = t.metadata.lastSelected));
                    });
                    const r = e.filter(e => e.connections && e.lastSelected),
                      o =
                        r.length > 0
                          ? r.reduce((e, t) => (e.lastSelected > t.lastSelected ? e : t))
                          : null;
                    e.forEach(e => {
                      (e.pinned = Boolean(t.includes(e.address))),
                        (e.hidden = Boolean(n.includes(e.address))),
                        (e.active = Boolean(o && e.id === o.id));
                    });
                    return [
                      ...(null == t
                        ? void 0
                        : t
                            .map(t => e.find(e => e.address === t))
                            .filter(e =>
                              Boolean(
                                e && t.includes(e.address) && !(null != n && n.includes(e.address))
                              )
                            )),
                      ...e.filter(e => !t.includes(e.address) && !n.includes(e.address)),
                      ...e.filter(e => n.includes(e.address)),
                    ];
                  }
                ));
                n.getUpdatedAndSortedAccountsWithCaipAccountId = (0, x.createDeepEqualSelector)(
                  Rt,
                  e =>
                    e.map(e => {
                      const { namespace: t, reference: n } = (0, A.parseCaipChainId)(e.scopes[0]);
                      return { ...e, caipAccountId: `${t}:${n}:${e.address}` };
                    })
                );
                function vt(e) {
                  return Boolean(e.metamask.useCurrencyRateCheck);
                }
                function Dt(e) {
                  const t = gt(e);
                  return Object.entries(t)
                    .filter(
                      ([e, t]) =>
                        t.status !== i.SnapStatus.Installing && (!t.preinstalled || !1 === t.hidden)
                    )
                    .map(([t, n]) => {
                      const a = We(e, null == n ? void 0 : n.id);
                      return {
                        key: t,
                        id: n.id,
                        iconUrl: null == a ? void 0 : a.iconUrl,
                        subjectType: null == a ? void 0 : a.subjectType,
                        packageName: (0, i.stripSnapPrefix)(n.id),
                        name: pt(e, n.id).name,
                      };
                    });
                }
                n.useSafeChainsListValidationSelector = e => e.metamask.useSafeChainsListValidation;
                (n.getSelectedKeyringByIdOrDefault = (0, d.createSelector)(
                  ge,
                  (e, t) => t,
                  (e, t) => e.find(e => e.metadata.id === t) ?? e[0]
                )),
                  (n.getHdKeyringIndexByIdOrDefault = (0, d.createSelector)(
                    Te,
                    (e, t) => t,
                    (e, t) => e.findIndex(e => e.metadata.id === t) ?? 0
                  ));
                const Pt = (n.getKeyringOfSelectedAccount = (0, d.createSelector)(
                  Q.getSelectedInternalAccount,
                  ge,
                  (e, t) =>
                    t.find(t => t.accounts.some(t => (0, L.isEqualCaseInsensitive)(t, e.address)))
                ));
                (n.getHdKeyringOfSelectedAccountOrPrimaryKeyring = (0, d.createSelector)(
                  Pt,
                  Te,
                  (e, t) => (e.type === E.KeyringTypes.hd ? e : t[0])
                )),
                  (n.getPermissionSubjectsDeepEqual = (0, x.createDeepEqualSelector)(
                    e => e.metamask.subjects || {},
                    e => e
                  )),
                  (n.getSubjectMetadataDeepEqual = (0, x.createDeepEqualSelector)(
                    e => e.metamask.subjectMetadata,
                    e => e
                  ));
                function Mt(e) {
                  return e.metamask.subjects || {};
                }
                function bt(e, t) {
                  return xt(Gt(Vt(e, t)));
                }
                function Bt(e, t) {
                  return jt(Gt(Vt(e, t)));
                }
                function Lt(e, t) {
                  const n = Gt(Vt(e, t)),
                    a = (0, Y.getCaip25CaveatFromPermission)(n);
                  return a ? (0, V.getCaipAccountIdsFromCaip25CaveatValue)(a.value) : [];
                }
                function Ut(e, t) {
                  const n = Gt(Vt(e, t));
                  return n ? (0, j.getAllScopesFromPermission)(n) : [];
                }
                function qt(e) {
                  return bt(e, Je(e));
                }
                function Ft(e, t) {
                  return bt(e, t);
                }
                function Ht(e) {
                  const t = Mt(e);
                  return Object.keys(t).reduce((e, n) => {
                    const a = Kt(t[n]);
                    return a.length > 0 && (e[n] = a), e;
                  }, {});
                }
                function Wt(e) {
                  return e.metamask.subjectMetadata;
                }
                n.isAccountConnectedToCurrentTab = (0, x.createDeepEqualSelector)(
                  qt,
                  (e, t) => t,
                  (e, t) => e.some(e => e === t)
                );
                function Gt(e = {}) {
                  var t;
                  return null === (t = e.permissions) || void 0 === t
                    ? void 0
                    : t[S.Caip25EndowmentPermissionName];
                }
                function Kt(e) {
                  return xt(Gt(e));
                }
                function xt(e) {
                  if (!e) return [];
                  const t = (0, Y.getCaip25CaveatFromPermission)(e);
                  return t ? (0, S.getEthAccounts)(t.value) : [];
                }
                function jt(e) {
                  if (!e) return [];
                  const t = (0, Y.getCaip25CaveatFromPermission)(e);
                  return t ? (0, S.getPermittedEthChainIds)(t.value) : [];
                }
                function Vt(e, t) {
                  var n;
                  return t && (null === (n = e.metamask.subjects) || void 0 === n ? void 0 : n[t]);
                }
                function Yt(e) {
                  var t;
                  const {
                      activeTab: n,
                      metamask: { permissionHistory: a },
                    } = e,
                    r =
                      null === (t = a[n.origin]) ||
                      void 0 === t ||
                      null === (t = t.eth_accounts) ||
                      void 0 === t
                        ? void 0
                        : t.accounts,
                    o = _e(e),
                    s = qt(e);
                  return o
                    .filter(e => s.includes(e.address))
                    .filter(e => (0, T.isEvmAccountType)(e.type))
                    .map(e => ({
                      ...e,
                      metadata: { ...e.metadata, lastActive: null == r ? void 0 : r[e.address] },
                    }))
                    .sort(({ lastSelected: e }, { lastSelected: t }) =>
                      e === t ? 0 : e === undefined ? 1 : t === undefined ? -1 : t - e
                    );
                }
                function $t(e, t) {
                  var n;
                  const {
                      metamask: { permissionHistory: a },
                    } = e,
                    r =
                      null === (n = a[t.origin]) ||
                      void 0 === n ||
                      null === (n = n.eth_accounts) ||
                      void 0 === n
                        ? void 0
                        : n.accounts,
                    o = _e(e),
                    s = Ft(e, t);
                  return o
                    .filter(e => s.includes(e.address))
                    .filter(e => (0, T.isEvmAccountType)(e.type))
                    .map(e => ({
                      ...e,
                      metadata: { ...e.metadata, lastActive: null == r ? void 0 : r[e.address] },
                    }))
                    .sort(({ lastSelected: e }, { lastSelected: t }) =>
                      e === t ? 0 : e === undefined ? 1 : t === undefined ? -1 : t - e
                    );
                }
                function zt(e) {
                  return Object.values(e.metamask.pendingApprovals)
                    .filter(
                      ({ type: e }) =>
                        'wallet_installSnap' === e ||
                        'wallet_updateSnap' === e ||
                        'wallet_installSnapResult' === e
                    )
                    .map(({ requestData: e }) => e);
                }
                function Qt(e) {
                  var t;
                  return null ===
                    (t = (0, J.getApprovalRequestsByType)(
                      e,
                      s.ApprovalType.WalletRequestPermissions
                    )) || void 0 === t
                    ? void 0
                    : t.map(({ requestData: e }) => e);
                }
              };
            };
      },
      { package: '$root$', file: 'ui/selectors/selectors.js' },
    ],
    [
      7617,
      {
        '../../shared/constants/network': 5804,
        '../../shared/constants/transaction': 5819,
        '../../shared/modules/conversion.utils': 5858,
        '../../shared/modules/selectors/networks': 5875,
        '../../shared/modules/selectors/util': 5877,
        '../helpers/constants/transactions': 6884,
        '../helpers/utils/tx-helper': 6920,
        './accounts': 7592,
        './approvals': 7594,
        '@metamask/controller-utils': 1515,
        '@metamask/smart-transactions-controller/dist/types': 2661,
        '@metamask/transaction-controller': 2946,
        reselect: 5353,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getUnapprovedTransactions =
                    n.getTransactions =
                    n.getCurrentNetworkTransactions =
                    n.getApprovedAndSignedTransactions =
                    n.getAllUnapprovedTransactions =
                    n.getAllNetworkTransactions =
                      void 0),
                  (n.hasTransactionPendingApprovals = function (e) {
                    return (
                      (0, S.getApprovalRequestsByType)(e, r.ApprovalType.Transaction).length > 0 ||
                      (0, S.hasPendingApprovals)(e, H)
                    );
                  }),
                  (n.nonceSortedTransactionsSelectorAllChains =
                    n.nonceSortedTransactionsSelector =
                    n.nonceSortedPendingTransactionsSelectorAllChains =
                    n.nonceSortedPendingTransactionsSelector =
                    n.nonceSortedCompletedTransactionsSelectorAllChains =
                    n.nonceSortedCompletedTransactionsSelector =
                    n.incomingTxListSelectorAllChains =
                    n.incomingTxListSelector =
                      void 0),
                  (n.selectTransactionMetadata = W),
                  (n.unapprovedTypedMessagesSelector =
                    n.unapprovedPersonalMsgsSelector =
                    n.unapprovedMessagesSelector =
                    n.unapprovedEncryptionPublicKeyMsgsSelector =
                    n.unapprovedDecryptMsgsSelector =
                    n.transactionsSelectorAllChains =
                    n.transactionsSelector =
                    n.transactionSubSelectorAllChains =
                    n.transactionSubSelector =
                    n.submittedPendingTransactionsSelector =
                    n.smartTransactionsListSelector =
                    n.selectedAddressTxListSelectorAllChain =
                    n.selectedAddressTxListSelector =
                    n.selectTransactionSender =
                      void 0);
                var a,
                  r = e('@metamask/controller-utils'),
                  o = e('reselect'),
                  s = e('@metamask/transaction-controller'),
                  i = e('@metamask/smart-transactions-controller/dist/types'),
                  c = e('../helpers/constants/transactions'),
                  u = (a = e('../helpers/utils/tx-helper')) && a.__esModule ? a : { default: a },
                  d = e('../../shared/constants/transaction'),
                  l = e('../../shared/modules/conversion.utils'),
                  g = e('../../shared/modules/selectors/networks'),
                  T = e('../../shared/modules/selectors/util'),
                  m = e('../../shared/constants/network'),
                  p = e('./accounts'),
                  S = e('./approvals');
                const E = [s.TransactionType.cancel, s.TransactionType.retry],
                  f = [
                    i.SmartTransactionStatuses.PENDING,
                    i.SmartTransactionStatuses.UNKNOWN,
                    i.SmartTransactionStatuses.RESOLVED,
                    i.SmartTransactionStatuses.CANCELLED,
                  ],
                  A = (n.getTransactions = (0, T.createDeepEqualSelector)(
                    e => {
                      const { transactions: t } = e.metamask ?? {};
                      return null != t && t.length ? [...t].sort((e, t) => e.time - t.time) : [];
                    },
                    e => e
                  )),
                  _ = (n.getAllNetworkTransactions = (0, T.createDeepEqualSelector)(A, e => {
                    if (!e.length) return [];
                    const t = m.FEATURED_NETWORK_CHAIN_IDS;
                    return e.filter(e => t.includes(e.chainId));
                  })),
                  h = (n.getCurrentNetworkTransactions = (0, T.createDeepEqualSelector)(
                    e => {
                      const t = A(e);
                      if (!t.length) return [];
                      const { chainId: n } = (0, g.getProviderConfig)(e);
                      return t.filter(e => e.chainId === n);
                    },
                    e => e
                  )),
                  N = (n.incomingTxListSelectorAllChains = (0, T.createDeepEqualSelector)(
                    e => {
                      const t = _(e),
                        { address: n } = (0, p.getSelectedInternalAccount)(e);
                      return t.filter(
                        e => e.type === s.TransactionType.incoming && e.txParams.to === n
                      );
                    },
                    e => e
                  )),
                  k =
                    ((n.getUnapprovedTransactions = (0, T.createDeepEqualSelector)(
                      e => {
                        const t = A(e);
                        return (0, T.filterAndShapeUnapprovedTransactions)(t);
                      },
                      e => e
                    )),
                    (n.getAllUnapprovedTransactions = (0, T.createDeepEqualSelector)(
                      e => {
                        const { transactions: t } = e.metamask || [];
                        if (null == t || !t.length) return [];
                        const n = [...t].sort((e, t) => e.time - t.time);
                        return (0, T.filterAndShapeUnapprovedTransactions)(n);
                      },
                      e => e
                    )),
                    (n.getApprovedAndSignedTransactions = (0, T.createDeepEqualSelector)(
                      e =>
                        A(e).filter(e =>
                          [s.TransactionStatus.approved, s.TransactionStatus.signed].includes(
                            e.status
                          )
                        ),
                      e => e
                    )),
                    (n.incomingTxListSelector = (0, T.createDeepEqualSelector)(
                      e => {
                        const t = h(e),
                          { address: n } = (0, p.getSelectedInternalAccount)(e);
                        return t.filter(
                          e => e.type === s.TransactionType.incoming && e.txParams.to === n
                        );
                      },
                      e => e
                    ))),
                  I = e => e.metamask.unapprovedPersonalMsgs;
                n.unapprovedPersonalMsgsSelector = I;
                const C = e => e.metamask.unapprovedDecryptMsgs;
                n.unapprovedDecryptMsgsSelector = C;
                const y = e => e.metamask.unapprovedEncryptionPublicKeyMsgs;
                n.unapprovedEncryptionPublicKeyMsgsSelector = y;
                const w = e => e.metamask.unapprovedTypedMessages;
                n.unapprovedTypedMessagesSelector = w;
                const O = e => {
                  var t;
                  const { address: n } = (0, p.getSelectedInternalAccount)(e);
                  return null === (t = e.metamask.smartTransactionsState) ||
                    void 0 === t ||
                    null === (t = t.smartTransactions) ||
                    void 0 === t ||
                    null === (t = t[(0, g.getCurrentChainId)(e)]) ||
                    void 0 === t
                    ? void 0
                    : t
                        .filter(e => {
                          var t;
                          return (
                            (null === (t = e.txParams) || void 0 === t ? void 0 : t.from) === n &&
                            !e.confirmed &&
                            (e.status === i.SmartTransactionStatuses.PENDING ||
                              ((e.type === s.TransactionType.swap ||
                                e.type === s.TransactionType.swapApproval) &&
                                f.includes(e.status)))
                          );
                        })
                        .map(e => {
                          var t;
                          return {
                            ...e,
                            isSmartTransaction: !0,
                            status:
                              null !== (t = e.status) && void 0 !== t && t.startsWith('cancelled')
                                ? d.SmartTransactionStatus.cancelled
                                : e.status,
                          };
                        });
                };
                n.smartTransactionsListSelector = O;
                const R = (n.selectedAddressTxListSelectorAllChain = (0, o.createSelector)(
                    p.getSelectedInternalAccount,
                    _,
                    O,
                    (e, t = [], n = []) =>
                      t
                        .filter(({ txParams: t }) => t.from === e.address)
                        .filter(({ type: e }) => e !== s.TransactionType.incoming)
                        .concat(n)
                  )),
                  v = (n.selectedAddressTxListSelector = (0, o.createSelector)(
                    p.getSelectedInternalAccount,
                    h,
                    O,
                    (e, t = [], n = []) =>
                      t
                        .filter(({ txParams: t }) => t.from === e.address)
                        .filter(({ type: e }) => e !== s.TransactionType.incoming)
                        .concat(n)
                  )),
                  D = (n.unapprovedMessagesSelector = (0, o.createSelector)(
                    I,
                    C,
                    y,
                    w,
                    g.getCurrentChainId,
                    (e = {}, t = {}, n = {}, a = {}, r) => (0, u.default)({}, e, t, n, a, r) || []
                  )),
                  P = (n.transactionSubSelectorAllChains = (0, o.createSelector)(
                    D,
                    N,
                    (e = [], t = []) => e.concat(t)
                  )),
                  M = (n.transactionSubSelector = (0, o.createSelector)(D, k, (e = [], t = []) =>
                    e.concat(t)
                  )),
                  b = (n.transactionsSelector = (0, o.createSelector)(M, v, (e = [], t = []) =>
                    [...t.concat(e)].sort((e, t) => t.time - e.time)
                  )),
                  B = (n.transactionsSelectorAllChains = (0, o.createSelector)(
                    P,
                    R,
                    (e = [], t = []) => [...t.concat(e)].sort((e, t) => t.time - e.time)
                  )),
                  L = (e, t) => {
                    const { primaryTransaction: { time: n } = {} } = t;
                    let a = e.length;
                    for (let t = 0; t < e.length; t++) {
                      const r = e[t],
                        { primaryTransaction: { time: o } = {} } = r;
                      if (o > n) {
                        a = t;
                        break;
                      }
                    }
                    e.splice(a, 0, t);
                  },
                  U = e => {
                    const t = [],
                      n = [],
                      a = [],
                      r = {};
                    e.forEach(e => {
                      const {
                        txParams: { nonce: o } = {},
                        status: i,
                        type: u,
                        time: d,
                        txReceipt: g,
                      } = e;
                      if (void 0 === o || u === s.TransactionType.incoming) {
                        const a = {
                          transactions: [e],
                          initialTransaction: e,
                          primaryTransaction: e,
                          hasRetried: !1,
                          hasCancelled: !1,
                          nonce: o,
                        };
                        u === s.TransactionType.incoming ? n.push(a) : L(t, a);
                      } else if (o in r) {
                        var T, m;
                        const t = r[o];
                        ((e, t) => {
                          const { time: n } = t;
                          let a = e.length;
                          for (let t = 0; t < e.length; t++)
                            if (e[t].time > n) {
                              a = t;
                              break;
                            }
                          e.splice(a, 0, t);
                        })(t.transactions, e);
                        const {
                            primaryTransaction: { time: n = 0 } = {},
                            initialTransaction: { time: a = 0 } = {},
                          } = t,
                          l = {
                            isOnChainFailure: '0x0' === (null == g ? void 0 : g.status),
                            isEphemeral:
                              i === s.TransactionStatus.failed &&
                              '0x0' !== (null == g ? void 0 : g.status),
                            isRetryOrCancel: E.includes(u),
                            occurredAfterPrimary: d > n,
                            hasPriorityStatus: i in c.PRIORITY_STATUS_HASH,
                            isConfirmed: i === s.TransactionStatus.confirmed,
                            occurredBeforeInitial: d < a,
                            isValidRetry:
                              u === s.TransactionType.retry &&
                              (i in c.PRIORITY_STATUS_HASH || i === s.TransactionStatus.dropped),
                            isValidCancel:
                              u === s.TransactionType.cancel &&
                              (i in c.PRIORITY_STATUS_HASH || i === s.TransactionStatus.dropped),
                            eligibleForInitial: !E.includes(u) && i !== s.TransactionStatus.failed,
                            shouldBePrimary:
                              i === s.TransactionStatus.confirmed ||
                              '0x0' === (null == g ? void 0 : g.status),
                          },
                          p = {
                            isEphemeral:
                              t.primaryTransaction.status === s.TransactionStatus.failed &&
                              '0x0' !==
                                (null === (T = t.primaryTransaction) ||
                                void 0 === T ||
                                null === (T = T.txReceipt) ||
                                void 0 === T
                                  ? void 0
                                  : T.status),
                          },
                          S = {
                            isEphemeral:
                              t.initialTransaction.status === s.TransactionStatus.failed &&
                              '0x0' !==
                                (null === (m = t.initialTransaction.txReceipt) || void 0 === m
                                  ? void 0
                                  : m.status),
                          };
                        (l.shouldBePrimary ||
                          p.isEphemeral ||
                          (l.occurredAfterPrimary && l.hasPriorityStatus)) &&
                          (t.primaryTransaction = e),
                          ((l.occurredBeforeInitial && l.eligibleForInitial) ||
                            (S.isEphemeral && l.eligibleForInitial)) &&
                            (t.initialTransaction = e),
                          l.isValidRetry && (t.hasRetried = !0),
                          l.isValidCancel && (t.hasCancelled = !0);
                      } else
                        (r[o] = {
                          nonce: o,
                          transactions: [e],
                          initialTransaction: e,
                          primaryTransaction: e,
                          hasRetried:
                            u === s.TransactionType.retry &&
                            (i in c.PRIORITY_STATUS_HASH || i === s.TransactionStatus.dropped),
                          hasCancelled:
                            u === s.TransactionType.cancel &&
                            (i in c.PRIORITY_STATUS_HASH || i === s.TransactionStatus.dropped),
                        }),
                          ((e, t) => {
                            let n = e.length;
                            for (let a = 0; a < e.length; a++) {
                              const r = e[a];
                              if (Number((0, l.hexToDecimal)(r)) > Number((0, l.hexToDecimal)(t))) {
                                n = a;
                                break;
                              }
                            }
                            e.splice(n, 0, t);
                          })(a, o);
                    });
                    const o = a.map(e => r[e]);
                    return (
                      ((e, t) => {
                        t.forEach(t => {
                          L(e, t);
                        });
                      })(o, n),
                      t.concat(o).map(e => {
                        var t;
                        if (
                          E.includes(
                            null === (t = e.initialTransaction) || void 0 === t ? void 0 : t.type
                          )
                        ) {
                          const t = e.transactions.find(e => !E.includes(e.type));
                          if (t) return { ...e, initialTransaction: t };
                        }
                        return e;
                      })
                    );
                  },
                  q = (n.nonceSortedTransactionsSelector = (0, o.createSelector)(b, (e = []) =>
                    U(e)
                  )),
                  F = (n.nonceSortedTransactionsSelectorAllChains = (0, o.createSelector)(
                    B,
                    (e = []) => U(e)
                  )),
                  H =
                    ((n.nonceSortedPendingTransactionsSelectorAllChains = (0, o.createSelector)(
                      F,
                      (e = []) =>
                        e.filter(({ primaryTransaction: e }) => e.status in c.PENDING_STATUS_HASH)
                    )),
                    (n.nonceSortedCompletedTransactionsSelectorAllChains = (0, o.createSelector)(
                      F,
                      (e = []) =>
                        e
                          .filter(
                            ({ primaryTransaction: e }) => !(e.status in c.PENDING_STATUS_HASH)
                          )
                          .reverse()
                    )),
                    (n.nonceSortedPendingTransactionsSelector = (0, o.createSelector)(q, (e = []) =>
                      e.filter(({ primaryTransaction: e }) => e.status in c.PENDING_STATUS_HASH)
                    )),
                    (n.nonceSortedCompletedTransactionsSelector = (0, o.createSelector)(
                      q,
                      (e = []) =>
                        e
                          .filter(
                            ({ primaryTransaction: e }) => !(e.status in c.PENDING_STATUS_HASH)
                          )
                          .reverse()
                    )),
                    (n.submittedPendingTransactionsSelector = (0, o.createSelector)(b, (e = []) =>
                      e.filter(e => e.status === s.TransactionStatus.submitted)
                    )),
                    [
                      r.ApprovalType.EthDecrypt,
                      r.ApprovalType.EthGetEncryptionPublicKey,
                      r.ApprovalType.EthSignTypedData,
                      r.ApprovalType.PersonalSign,
                    ]);
                function W(e, t) {
                  return e.metamask.transactions.find(e => e.id === t);
                }
                n.selectTransactionSender = (0, o.createSelector)(
                  (e, t) => W(e, t),
                  e => {
                    var t;
                    return null == e || null === (t = e.txParams) || void 0 === t ? void 0 : t.from;
                  }
                );
              };
            };
      },
      { package: '$root$', file: 'ui/selectors/transactions.js' },
    ],
    [
      7618,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.UNLOCK_SUCCEEDED =
                    n.UNLOCK_IN_PROGRESS =
                    n.UNLOCK_FAILED =
                    n.TRANSACTION_ERROR =
                    n.TOKEN_SORT_CRITERIA =
                    n.TOGGLE_NETWORK_MENU =
                    n.TOGGLE_GAS_LOADING_ANIMATION =
                    n.TOGGLE_CURRENCY_INPUT_SWITCH =
                    n.TOGGLE_ACCOUNT_MENU =
                    n.SHOW_SETTINGS_PAGE_ERROR =
                    n.SHOW_SEND_TOKEN_PAGE =
                    n.SHOW_PRIVATE_KEY =
                    n.SHOW_PERMITTED_NETWORK_TOAST_OPEN =
                    n.SHOW_PERMITTED_NETWORK_TOAST_CLOSE =
                    n.SHOW_NFT_STILL_FETCHING_INDICATION =
                    n.SHOW_NFT_DETECTION_ENABLEMENT_TOAST =
                    n.SHOW_LOADING =
                    n.SHOW_KEYRING_SNAP_REMOVAL_RESULT =
                    n.SHOW_IPFS_MODAL_OPEN =
                    n.SHOW_IPFS_MODAL_CLOSE =
                    n.SHOW_CONF_TX_PAGE =
                    n.SHOW_BASIC_FUNCTIONALITY_MODAL_OPEN =
                    n.SHOW_BASIC_FUNCTIONALITY_MODAL_CLOSE =
                    n.SHOW_ACCOUNTS_PAGE =
                    n.SET_WEBHID_CONNECTED_STATUS =
                    n.SET_SMART_TRANSACTIONS_ERROR =
                    n.SET_SLIDES =
                    n.SET_SHOW_NFT_AUTO_DETECT_MODAL_UPGRADE =
                    n.SET_SHOW_NEW_SRP_ADDED_TOAST =
                    n.SET_SELECTED_NETWORK_CONFIGURATION_ID =
                    n.SET_SELECTED_NETWORKS_FOR_DAPP_CONNECTIONS =
                    n.SET_SELECTED_ACCOUNTS_FOR_DAPP_CONNECTIONS =
                    n.SET_REQUEST_ACCOUNT_TABS =
                    n.SET_REMOVE_NFT_MESSAGE =
                    n.SET_PENDING_TOKENS =
                    n.SET_PARTICIPATE_IN_METAMETRICS =
                    n.SET_OPEN_METAMASK_TAB_IDS =
                    n.SET_NEXT_NONCE =
                    n.SET_NEW_TOKENS_IMPORTED_ERROR =
                    n.SET_NEW_TOKENS_IMPORTED =
                    n.SET_NEW_NFT_ADDED_MESSAGE =
                    n.SET_NEW_NETWORK_ADDED =
                    n.SET_LEDGER_TRANSPORT_STATUS =
                    n.SET_HARDWARE_WALLET_DEFAULT_HD_PATH =
                    n.SET_FIRST_TIME_FLOW_TYPE =
                    n.SET_EDIT_NETWORK =
                    n.SET_DATA_COLLECTION_FOR_MARKETING =
                    n.SET_CUSTOM_TOKEN_AMOUNT =
                    n.SET_CURRENT_LOCALE =
                    n.SET_CONFIRMATION_EXCHANGE_RATES =
                    n.SET_ACCOUNT_LABEL =
                    n.SET_ACCOUNT_DETAILS_ADDRESS =
                    n.SELECTED_ADDRESS_CHANGED =
                    n.SELECTED_ACCOUNT_CHANGED =
                    n.RESET_ONBOARDING =
                    n.QR_CODE_DETECTED =
                    n.ONBOARDING_TOGGLE_BASIC_FUNCTIONALITY_ON =
                    n.ONBOARDING_TOGGLE_BASIC_FUNCTIONALITY_OFF =
                    n.ONBOARDED_IN_THIS_UI_SESSION =
                    n.NETWORK_DROPDOWN_OPEN =
                    n.NETWORK_DROPDOWN_CLOSE =
                    n.MODAL_OPEN =
                    n.MODAL_CLOSE =
                    n.LOCK_METAMASK =
                    n.LOADING_METHOD_DATA_STARTED =
                    n.LOADING_METHOD_DATA_FINISHED =
                    n.IMPORT_TOKENS_POPOVER_OPEN =
                    n.IMPORT_TOKENS_POPOVER_CLOSE =
                    n.IMPORT_NFTS_MODAL_OPEN =
                    n.IMPORT_NFTS_MODAL_CLOSE =
                    n.HIDE_WHATS_NEW_POPUP =
                    n.HIDE_WARNING =
                    n.HIDE_SETTINGS_PAGE_ERROR =
                    n.HIDE_NFT_STILL_FETCHING_INDICATION =
                    n.HIDE_LOADING =
                    n.HIDE_KEYRING_SNAP_REMOVAL_RESULT =
                    n.GO_HOME =
                    n.GAS_FEE_ESTIMATES_UPDATED =
                    n.DISPLAY_WARNING =
                    n.DISMISS_SMART_TRANSACTIONS_ERROR_MESSAGE =
                    n.DEPRECATED_NETWORK_POPOVER_OPEN =
                    n.DEPRECATED_NETWORK_POPOVER_CLOSE =
                    n.DELETE_METAMETRICS_DATA_MODAL_OPEN =
                    n.DELETE_METAMETRICS_DATA_MODAL_CLOSE =
                    n.DATA_DELETION_ERROR_MODAL_OPEN =
                    n.DATA_DELETION_ERROR_MODAL_CLOSE =
                    n.CONNECT_ACCOUNTS_MODAL_OPEN =
                    n.CONNECT_ACCOUNTS_MODAL_CLOSE =
                    n.COMPLETE_ONBOARDING =
                    n.COMPLETED_TX =
                    n.CLOSE_WELCOME_SCREEN =
                    n.CLEAR_SWAP_AND_SEND_STATE =
                    n.CLEAR_PENDING_TOKENS =
                    n.CLEAR_ACCOUNT_DETAILS =
                    n.CHAIN_CHANGED =
                    n.CAPTURE_SINGLE_EXCEPTION =
                    n.ALERT_OPEN =
                    n.ALERT_CLOSE =
                    n.ADDRESS_BOOK_UPDATED =
                    n.ACCOUNT_CHANGED =
                      void 0),
                  (n.UPDATE_TRANSACTION_PARAMS =
                    n.UPDATE_METAMASK_STATE =
                    n.UPDATE_CUSTOM_NONCE =
                      void 0);
                (n.GO_HOME = 'GO_HOME'),
                  (n.MODAL_OPEN = 'UI_MODAL_OPEN'),
                  (n.MODAL_CLOSE = 'UI_MODAL_CLOSE'),
                  (n.SET_CONFIRMATION_EXCHANGE_RATES = 'SET_CONFIRMATION_EXCHANGE_RATES'),
                  (n.ALERT_OPEN = 'UI_ALERT_OPEN'),
                  (n.ALERT_CLOSE = 'UI_ALERT_CLOSE'),
                  (n.QR_CODE_DETECTED = 'UI_QR_CODE_DETECTED'),
                  (n.NETWORK_DROPDOWN_OPEN = 'UI_NETWORK_DROPDOWN_OPEN'),
                  (n.NETWORK_DROPDOWN_CLOSE = 'UI_NETWORK_DROPDOWN_CLOSE'),
                  (n.IMPORT_NFTS_MODAL_OPEN = 'UI_IMPORT_NFTS_MODAL_OPEN'),
                  (n.IMPORT_NFTS_MODAL_CLOSE = 'UI_IMPORT_NFTS_MODAL_CLOSE'),
                  (n.SHOW_IPFS_MODAL_OPEN = 'UI_IPFS_MODAL_OPEN'),
                  (n.SHOW_PERMITTED_NETWORK_TOAST_OPEN = 'UI_PERMITTED_NETWORK_TOAST_OPEN'),
                  (n.SHOW_PERMITTED_NETWORK_TOAST_CLOSE = 'UI_PERMITTED_NETWORK_TOAST_CLOSE'),
                  (n.SHOW_IPFS_MODAL_CLOSE = 'UI_IPFS_MODAL_CLOSE'),
                  (n.IMPORT_TOKENS_POPOVER_OPEN = 'UI_IMPORT_TOKENS_POPOVER_OPEN'),
                  (n.IMPORT_TOKENS_POPOVER_CLOSE = 'UI_IMPORT_TOKENS_POPOVER_CLOSE'),
                  (n.SHOW_BASIC_FUNCTIONALITY_MODAL_OPEN = 'SHOW_BASIC_FUNCTIONALITY_MODAL_OPEN'),
                  (n.SHOW_BASIC_FUNCTIONALITY_MODAL_CLOSE = 'SHOW_BASIC_FUNCTIONALITY_MODAL_CLOSE'),
                  (n.ONBOARDING_TOGGLE_BASIC_FUNCTIONALITY_ON =
                    'ONBOARDING_TOGGLE_BASIC_FUNCTIONALITY_ON'),
                  (n.ONBOARDING_TOGGLE_BASIC_FUNCTIONALITY_OFF =
                    'ONBOARDING_TOGGLE_BASIC_FUNCTIONALITY_OFF'),
                  (n.UPDATE_METAMASK_STATE = 'UPDATE_METAMASK_STATE'),
                  (n.SELECTED_ADDRESS_CHANGED = 'SELECTED_ADDRESS_CHANGED'),
                  (n.SELECTED_ACCOUNT_CHANGED = 'SELECTED_ACCOUNT_CHANGED'),
                  (n.ACCOUNT_CHANGED = 'ACCOUNT_CHANGED'),
                  (n.CHAIN_CHANGED = 'CHAIN_CHANGED'),
                  (n.ADDRESS_BOOK_UPDATED = 'ADDRESS_BOOK_UPDATED'),
                  (n.GAS_FEE_ESTIMATES_UPDATED = 'GAS_FEE_ESTIMATES_UPDATED'),
                  (n.CLOSE_WELCOME_SCREEN = 'CLOSE_WELCOME_SCREEN'),
                  (n.CLEAR_SWAP_AND_SEND_STATE = 'CLEAR_SWAP_AND_SEND_STATE'),
                  (n.UNLOCK_IN_PROGRESS = 'UNLOCK_IN_PROGRESS'),
                  (n.UNLOCK_FAILED = 'UNLOCK_FAILED'),
                  (n.UNLOCK_SUCCEEDED = 'UNLOCK_SUCCEEDED'),
                  (n.LOCK_METAMASK = 'LOCK_METAMASK'),
                  (n.DISPLAY_WARNING = 'DISPLAY_WARNING'),
                  (n.HIDE_WARNING = 'HIDE_WARNING'),
                  (n.SHOW_SETTINGS_PAGE_ERROR = 'SHOW_SETTINGS_PAGE_ERROR'),
                  (n.HIDE_SETTINGS_PAGE_ERROR = 'HIDE_SETTINGS_PAGE_ERROR'),
                  (n.CAPTURE_SINGLE_EXCEPTION = 'CAPTURE_SINGLE_EXCEPTION'),
                  (n.SHOW_ACCOUNTS_PAGE = 'SHOW_ACCOUNTS_PAGE'),
                  (n.SHOW_CONF_TX_PAGE = 'SHOW_CONF_TX_PAGE'),
                  (n.SHOW_SEND_TOKEN_PAGE = 'SHOW_SEND_TOKEN_PAGE'),
                  (n.SHOW_PRIVATE_KEY = 'SHOW_PRIVATE_KEY'),
                  (n.SET_ACCOUNT_LABEL = 'SET_ACCOUNT_LABEL'),
                  (n.CLEAR_ACCOUNT_DETAILS = 'CLEAR_ACCOUNT_DETAILS'),
                  (n.SET_ACCOUNT_DETAILS_ADDRESS = 'SET_ACCOUNT_DETAILS_ADDRESS'),
                  (n.COMPLETED_TX = 'COMPLETED_TX'),
                  (n.TRANSACTION_ERROR = 'TRANSACTION_ERROR'),
                  (n.UPDATE_TRANSACTION_PARAMS = 'UPDATE_TRANSACTION_PARAMS'),
                  (n.SET_NEXT_NONCE = 'SET_NEXT_NONCE'),
                  (n.SET_HARDWARE_WALLET_DEFAULT_HD_PATH = 'SET_HARDWARE_WALLET_DEFAULT_HD_PATH'),
                  (n.SHOW_LOADING = 'SHOW_LOADING_INDICATION'),
                  (n.HIDE_LOADING = 'HIDE_LOADING_INDICATION'),
                  (n.SHOW_NFT_STILL_FETCHING_INDICATION = 'SHOW_NFT_STILL_FETCHING_INDICATION'),
                  (n.HIDE_NFT_STILL_FETCHING_INDICATION = 'HIDE_NFT_STILL_FETCHING_INDICATION'),
                  (n.SHOW_NFT_DETECTION_ENABLEMENT_TOAST = 'SHOW_NFT_DETECTION_ENABLEMENT_TOAST'),
                  (n.TOGGLE_ACCOUNT_MENU = 'TOGGLE_ACCOUNT_MENU'),
                  (n.TOGGLE_NETWORK_MENU = 'TOGGLE_NETWORK_MENU'),
                  (n.SET_SELECTED_ACCOUNTS_FOR_DAPP_CONNECTIONS =
                    'SET_SELECTED_ACCOUNTS_FOR_DAPP_CONNECTIONS'),
                  (n.SET_SELECTED_NETWORKS_FOR_DAPP_CONNECTIONS =
                    'SET_SELECTED_NETWORKS_FOR_DAPP_CONNECTIONS'),
                  (n.DEPRECATED_NETWORK_POPOVER_OPEN = 'DEPRECATED_NETWORK_POPOVER_OPEN'),
                  (n.DEPRECATED_NETWORK_POPOVER_CLOSE = 'DEPRECATED_NETWORK_POPOVER_CLOSE'),
                  (n.UPDATE_CUSTOM_NONCE = 'UPDATE_CUSTOM_NONCE'),
                  (n.SET_PARTICIPATE_IN_METAMETRICS = 'SET_PARTICIPATE_IN_METAMETRICS'),
                  (n.SET_DATA_COLLECTION_FOR_MARKETING = 'SET_DATA_COLLECTION_FOR_MARKETING'),
                  (n.DELETE_METAMETRICS_DATA_MODAL_OPEN = 'DELETE_METAMETRICS_DATA_MODAL_OPEN'),
                  (n.DELETE_METAMETRICS_DATA_MODAL_CLOSE = 'DELETE_METAMETRICS_DATA_MODAL_CLOSE'),
                  (n.DATA_DELETION_ERROR_MODAL_OPEN = 'DELETE_METAMETRICS_DATA_ERROR_MODAL_OPEN'),
                  (n.DATA_DELETION_ERROR_MODAL_CLOSE = 'DELETE_METAMETRICS_DATA_ERROR_MODAL_CLOSE'),
                  (n.SET_CURRENT_LOCALE = 'SET_CURRENT_LOCALE'),
                  (n.COMPLETE_ONBOARDING = 'COMPLETE_ONBOARDING'),
                  (n.RESET_ONBOARDING = 'RESET_ONBOARDING'),
                  (n.ONBOARDED_IN_THIS_UI_SESSION = 'ONBOARDED_IN_THIS_UI_SESSION'),
                  (n.SET_WEBHID_CONNECTED_STATUS = 'SET_WEBHID_CONNECTED_STATUS'),
                  (n.SET_LEDGER_TRANSPORT_STATUS = 'SET_LEDGER_TRANSPORT_STATUS'),
                  (n.SET_PENDING_TOKENS = 'SET_PENDING_TOKENS'),
                  (n.CLEAR_PENDING_TOKENS = 'CLEAR_PENDING_TOKENS'),
                  (n.SET_FIRST_TIME_FLOW_TYPE = 'SET_FIRST_TIME_FLOW_TYPE'),
                  (n.SET_SELECTED_NETWORK_CONFIGURATION_ID =
                    'SET_SELECTED_NETWORK_CONFIGURATION_ID'),
                  (n.SET_NEW_NETWORK_ADDED = 'SET_NEW_NETWORK_ADDED'),
                  (n.SET_EDIT_NETWORK = 'SET_EDIT_NETWORK'),
                  (n.SET_NEW_NFT_ADDED_MESSAGE = 'SET_NEW_NFT_ADDED_MESSAGE'),
                  (n.SET_REMOVE_NFT_MESSAGE = 'SET_REMOVE_NFT_MESSAGE'),
                  (n.LOADING_METHOD_DATA_STARTED = 'LOADING_METHOD_DATA_STARTED'),
                  (n.LOADING_METHOD_DATA_FINISHED = 'LOADING_METHOD_DATA_FINISHED'),
                  (n.SET_REQUEST_ACCOUNT_TABS = 'SET_REQUEST_ACCOUNT_TABS'),
                  (n.SET_OPEN_METAMASK_TAB_IDS = 'SET_OPEN_METAMASK_TAB_IDS'),
                  (n.HIDE_WHATS_NEW_POPUP = 'HIDE_WHATS_NEW_POPUP'),
                  (n.TOGGLE_GAS_LOADING_ANIMATION = 'TOGGLE_GAS_LOADING_ANIMATION'),
                  (n.SET_SMART_TRANSACTIONS_ERROR = 'SET_SMART_TRANSACTIONS_ERROR'),
                  (n.DISMISS_SMART_TRANSACTIONS_ERROR_MESSAGE =
                    'DISMISS_SMART_TRANSACTIONS_ERROR_MESSAGE'),
                  (n.TOGGLE_CURRENCY_INPUT_SWITCH = 'TOGGLE_CURRENCY_INPUT_SWITCH'),
                  (n.SET_NEW_TOKENS_IMPORTED = 'SET_NEW_TOKENS_IMPORTED'),
                  (n.SET_NEW_TOKENS_IMPORTED_ERROR = 'SET_NEW_TOKENS_IMPORTED_ERROR'),
                  (n.SET_CUSTOM_TOKEN_AMOUNT = 'SET_CUSTOM_TOKEN_AMOUNT'),
                  (n.CONNECT_ACCOUNTS_MODAL_OPEN = 'UI_CONNECT_ACCOUNTS_MODAL_OPEN'),
                  (n.CONNECT_ACCOUNTS_MODAL_CLOSE = 'UI_CONNECT_ACCOUNTS_MODAL_CLOSE'),
                  (n.SHOW_KEYRING_SNAP_REMOVAL_RESULT = 'SHOW_KEYRING_SNAP_REMOVAL_RESULT'),
                  (n.HIDE_KEYRING_SNAP_REMOVAL_RESULT = 'HIDE_KEYRING_SNAP_REMOVAL_RESULT'),
                  (n.SET_SHOW_NFT_AUTO_DETECT_MODAL_UPGRADE =
                    'SET_SHOW_NFT_AUTO_DETECT_MODAL_UPGRADE'),
                  (n.TOKEN_SORT_CRITERIA = 'TOKEN_SORT_CRITERIA'),
                  (n.SET_SLIDES = 'SET_SLIDES'),
                  (n.SET_SHOW_NEW_SRP_ADDED_TOAST = 'SET_SHOW_NEW_SRP_ADDED_TOAST');
              };
            };
      },
      { package: '$root$', file: 'ui/store/actionConstants.ts' },
    ],
    [
      7619,
      {
        '../../app/scripts/lib/util': 204,
        '../../shared/constants/app': 5789,
        '../../shared/constants/hardware-wallets': 5796,
        '../../shared/constants/metametrics': 5800,
        '../../shared/lib/four-byte': 5835,
        '../../shared/lib/multichain/chain-agnostic-permission-utils/caip-accounts': 5840,
        '../../shared/lib/switch-direction': 5847,
        '../../shared/modules/conversion.utils': 5858,
        '../../shared/modules/error': 5860,
        '../../shared/modules/hexstring-utils': 5864,
        '../../shared/modules/i18n': 5865,
        '../../shared/modules/selectors': 5874,
        '../../shared/modules/selectors/networks': 5875,
        '../../shared/modules/string-utils': 5878,
        '../ducks/alerts/unconnected-account': 6844,
        '../ducks/metamask/metamask': 6860,
        '../ducks/send': 6865,
        '../helpers/constants/notifications': 6876,
        '../pages/swaps/swaps.util': 7583,
        '../selectors': 7601,
        './actionConstants': 7618,
        './background-connection': 7620,
        '@metamask/profile-sync-controller/sdk': 2491,
        '@metamask/rpc-errors': 2585,
        '@metamask/snaps-utils': 2890,
        '@sentry/browser': 3136,
        buffer: 4139,
        lodash: 4921,
        loglevel: 4929,
        'webextension-polyfill': 5766,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                (function (t) {
                  (function () {
                    Object.defineProperty(n, '__esModule', { value: !0 }),
                      (n.abortTransactionSigning = function (e) {
                        return async t => {
                          try {
                            await (0, D.submitRequestToBackground)('abortTransactionSigning', [e]);
                          } catch (e) {
                            t(se(e));
                          }
                        };
                      }),
                      (n.accountTrackerStartPolling = async function (e) {
                        const t = await (0, D.submitRequestToBackground)(
                          'accountTrackerStartPolling',
                          [e]
                        );
                        return await Ee(t), t;
                      }),
                      (n.accountTrackerStopPollingByPollingToken = async function (e) {
                        await (0, D.submitRequestToBackground)(
                          'accountTrackerStopPollingByPollingToken',
                          [e]
                        ),
                          await fe(e);
                      }),
                      (n.addImportedTokens = function (e, t) {
                        return async n => {
                          try {
                            await (0, D.submitRequestToBackground)('addImportedTokens', [e, t]);
                          } catch (e) {
                            (0, y.logErrorWithMessage)(e);
                          } finally {
                            await de(n);
                          }
                        };
                      }),
                      (n.addNetwork = function (e) {
                        return async t => {
                          r.default.debug('background.addNetwork', e);
                          try {
                            return await (0, D.submitRequestToBackground)('addNetwork', [e]);
                          } catch (e) {
                            (0, y.logErrorWithMessage)(e), t(se('Had a problem adding networks!'));
                          }
                          return undefined;
                        };
                      }),
                      (n.addNewAccount = function (e) {
                        return (
                          r.default.debug('background.addNewAccount'),
                          async (t, n) => {
                            const a = (0, T.getMetaMaskHdKeyrings)(n()),
                              [r] = a;
                            let o = r;
                            if ((e && (o = a.find(t => t.metadata.id === e)), !o))
                              throw (
                                (console.error(
                                  'Should never reach this. There is always a keyring'
                                ),
                                new Error('Keyring not found'))
                              );
                            const s = o.accounts;
                            let i;
                            t(ne());
                            try {
                              i = await (0, D.submitRequestToBackground)('addNewAccount', [
                                s.length,
                                e,
                              ]);
                            } catch (e) {
                              throw (t(se(e)), e);
                            } finally {
                              t(re());
                            }
                            return await de(t), i;
                          }
                        );
                      }),
                      (n.addNft = function (e, t, n) {
                        return async a => {
                          if (!e) throw new Error('MetaMask - Cannot add NFT without address');
                          if (!t) throw new Error('MetaMask - Cannot add NFT without tokenID');
                          n || a(ne());
                          try {
                            await (0, D.submitRequestToBackground)('addNft', [e, t]);
                          } catch (e) {
                            (0, y.logErrorWithMessage)(e), a(se(e));
                          } finally {
                            await de(a), a(re());
                          }
                        };
                      }),
                      (n.addNftVerifyOwnership = function (e, t, n) {
                        return async a => {
                          if (!e) throw new Error('MetaMask - Cannot add NFT without address');
                          if (!t) throw new Error('MetaMask - Cannot add NFT without tokenID');
                          n || a(ne());
                          try {
                            await (0, D.submitRequestToBackground)('addNftVerifyOwnership', [e, t]);
                          } catch (e) {
                            if ((0, y.isErrorWithMessage)(e)) {
                              const t = (0, y.getErrorMessage)(e);
                              if (
                                t.includes('This NFT is not owned by the user') ||
                                t.includes('Unable to verify ownership')
                              )
                                throw e;
                              (0, y.logErrorWithMessage)(e), a(se(e));
                            }
                          } finally {
                            await de(a), a(re());
                          }
                        };
                      }),
                      (n.addPermittedAccount = function (e, t) {
                        return async n => {
                          await new Promise((n, a) => {
                            (0, D.callBackgroundMethod)('addPermittedAccount', [e, t], e => {
                              e ? a(e) : n();
                            });
                          }),
                            await de(n);
                        };
                      }),
                      (n.addPermittedAccounts = function (e, t) {
                        return async n => {
                          await new Promise((n, a) => {
                            (0, D.callBackgroundMethod)('addPermittedAccounts', [e, t], e => {
                              e ? a(e) : n();
                            });
                          }),
                            await de(n);
                        };
                      }),
                      (n.addPermittedChain = function (e, t) {
                        return async n => {
                          await new Promise((n, a) => {
                            (0, D.callBackgroundMethod)('addPermittedChain', [e, t], e => {
                              e ? a(e) : n();
                            });
                          }),
                            await de(n);
                        };
                      }),
                      (n.addPermittedChains = function (e, t) {
                        return async n => {
                          await new Promise((n, a) => {
                            (0, D.callBackgroundMethod)('addPermittedChains', [e, t], e => {
                              e ? a(e) : n();
                            });
                          }),
                            await de(n);
                        };
                      }),
                      (n.addPollingTokenToAppState = Ee),
                      (n.addToAddressBook = function (e, t = '', n = '') {
                        return (
                          r.default.debug('background.addToAddressBook'),
                          async (a, r) => {
                            const { chainId: o } = (0, m.getProviderConfig)(r());
                            let s;
                            try {
                              (s = await (0, D.submitRequestToBackground)('setAddressBook', [
                                (0, f.toChecksumHexAddress)(e),
                                t,
                                o,
                                n,
                              ])),
                                await de(a);
                            } catch (e) {
                              throw (
                                ((0, y.logErrorWithMessage)(e),
                                a(se('Address book failed to update')),
                                e)
                              );
                            }
                            s || a(se('Address book failed to update'));
                          }
                        );
                      }),
                      (n.addToken = function (
                        { address: e, symbol: t, decimals: n, image: a, networkClientId: r },
                        o
                      ) {
                        return async s => {
                          if (!e) throw new Error('MetaMask - Cannot add token without address');
                          o || s(ne());
                          try {
                            await (0, D.submitRequestToBackground)('addToken', [
                              { address: e, symbol: t, decimals: n, image: a, networkClientId: r },
                            ]);
                          } catch (e) {
                            (0, y.logErrorWithMessage)(e), s(se(e));
                          } finally {
                            await de(s), s(re());
                          }
                        };
                      }),
                      (n.addTransaction = async function (e, t) {
                        r.default.debug('background.addTransaction');
                        const n = (0, D.generateActionId)();
                        return await (0, D.submitRequestToBackground)('addTransaction', [
                          e,
                          { ...t, origin: l.ORIGIN_METAMASK, actionId: n },
                        ]);
                      }),
                      (n.addTransactionAndRouteToConfirmationPage = function (e, t) {
                        return async n => {
                          const a = (0, D.generateActionId)();
                          try {
                            r.default.debug('background.addTransaction');
                            const o = await (0, D.submitRequestToBackground)('addTransaction', [
                              e,
                              { ...t, actionId: a, origin: l.ORIGIN_METAMASK },
                            ]);
                            return n(X()), o;
                          } catch (e) {
                            throw (n(re()), n(se(e)), e);
                          }
                        };
                      }),
                      (n.addTransactionAndWaitForPublish = async function (e, t) {
                        r.default.debug('background.addTransactionAndWaitForPublish');
                        const n = (0, D.generateActionId)();
                        return await (0, D.submitRequestToBackground)(
                          'addTransactionAndWaitForPublish',
                          [e, { ...t, origin: l.ORIGIN_METAMASK, actionId: n }]
                        );
                      }),
                      (n.approvePermissionsRequest = function (e) {
                        return t => {
                          (0, D.callBackgroundMethod)('approvePermissionsRequest', [e], e => {
                            e && t(se(e)), de(t);
                          });
                        };
                      }),
                      (n.attemptCloseNotificationPopup = Ae),
                      (n.attemptLedgerTransportCreation = async function () {
                        return await (0, D.submitRequestToBackground)(
                          'attemptLedgerTransportCreation'
                        );
                      }),
                      (n.automaticallySwitchNetwork = function (e, t) {
                        return async n => {
                          await n(J(e)), await n(Z({ networkClientId: e, origin: t })), await de(n);
                        };
                      }),
                      (n.backupUserData = async function () {
                        let e;
                        try {
                          e = await (0, D.submitRequestToBackground)('backupUserData');
                        } catch (e) {
                          throw ((0, y.logErrorWithMessage)(e), e);
                        }
                        return e;
                      }),
                      (n.cancelDecryptMsg = function (e) {
                        return async t => {
                          t(ne());
                          try {
                            await (0, D.submitRequestToBackground)('cancelDecryptMessage', [e.id]);
                          } finally {
                            t(re());
                          }
                          return await de(t), t(H(e.id)), t(te()), e;
                        };
                      }),
                      (n.cancelEncryptionPublicKeyMsg = function (e) {
                        return async t => {
                          t(ne());
                          try {
                            await (0, D.submitRequestToBackground)('cancelEncryptionPublicKey', [
                              e.id,
                            ]);
                          } finally {
                            t(re());
                          }
                          return await de(t), t(H(e.id)), t(te()), e;
                        };
                      }),
                      (n.cancelQRHardwareSignRequest = function () {
                        return async e => {
                          e(re()),
                            await (0, D.submitRequestToBackground)('cancelQRHardwareSignRequest');
                        };
                      }),
                      (n.cancelSmartTransaction = function (e) {
                        return async t => {
                          try {
                            await (0, D.submitRequestToBackground)('cancelSmartTransaction', [e]);
                          } catch (e) {
                            if (((0, y.logErrorWithMessage)(e), (0, y.isErrorWithMessage)(e))) {
                              const n = (0, y.getErrorMessage)(e);
                              if (n.startsWith('Fetch error:')) {
                                const e = (0, h.parseSmartTransactionsError)(n);
                                t({ type: v.SET_SMART_TRANSACTIONS_ERROR, payload: e });
                              }
                            }
                            throw e;
                          }
                        };
                      }),
                      (n.cancelSyncQRHardware = function () {
                        return async e => {
                          e(re()), await (0, D.submitRequestToBackground)('cancelSyncQRHardware');
                        };
                      }),
                      (n.cancelTx = function (e, t = !0) {
                        return n => (
                          t && n(ne()),
                          new Promise((t, n) => {
                            (0, D.callBackgroundMethod)(
                              'rejectPendingApproval',
                              [String(e.id), i.providerErrors.userRejectedRequest().serialize()],
                              e => {
                                e ? n(e) : t();
                              }
                            );
                          })
                            .then(() => de(n))
                            .then(
                              () => (n((0, p.resetSendState)()), n(H(e.id)), n(re()), n(te()), e)
                            )
                            .catch(e => {
                              throw (n(re()), e);
                            })
                        );
                      }),
                      (n.cancelTxs = function (e) {
                        return async t => {
                          t(ne());
                          try {
                            const n = e.map(({ id: e }) => e),
                              a = n.map(
                                e =>
                                  new Promise((t, n) => {
                                    (0, D.callBackgroundMethod)(
                                      'rejectPendingApproval',
                                      [
                                        String(e),
                                        i.providerErrors.userRejectedRequest().serialize(),
                                      ],
                                      e => {
                                        e ? n(e) : t();
                                      }
                                    );
                                  })
                              );
                            await Promise.all(a),
                              await de(t),
                              t((0, p.resetSendState)()),
                              n.forEach(e => {
                                t(H(e));
                              });
                          } finally {
                            (0, g.getEnvironmentType)() === l.ENVIRONMENT_TYPE_NOTIFICATION
                              ? Ae()
                              : t(re());
                          }
                        };
                      }),
                      (n.captureSingleException = function (e) {
                        return async (t, n) => {
                          const { singleExceptions: a } = n().appState;
                          e in a ||
                            (t({ type: v.CAPTURE_SINGLE_EXCEPTION, value: e }),
                            (0, o.captureException)(Error(e)));
                        };
                      }),
                      (n.checkAccountsPresence = function (e) {
                        return async () => {
                          try {
                            return await (0, D.submitRequestToBackground)('checkAccountsPresence', [
                              e,
                            ]);
                          } catch (e) {
                            throw ((0, y.logErrorWithMessage)(e), e);
                          }
                        };
                      }),
                      (n.checkAndUpdateAllNftsOwnershipStatus = async function () {
                        await (0, D.submitRequestToBackground)(
                          'checkAndUpdateAllNftsOwnershipStatus'
                        );
                      }),
                      (n.checkAndUpdateSingleNftOwnershipStatus = async function (e) {
                        await (0, D.submitRequestToBackground)(
                          'checkAndUpdateSingleNftOwnershipStatus',
                          [e, !1]
                        );
                      }),
                      (n.checkHardwareStatus = function (e, t) {
                        return (
                          r.default.debug('background.checkHardwareStatus', e, t),
                          async n => {
                            n(ne());
                            let a = !1;
                            try {
                              a = await (0, D.submitRequestToBackground)('checkHardwareStatus', [
                                e,
                                t,
                              ]);
                            } catch (e) {
                              throw ((0, y.logErrorWithMessage)(e), n(se(e)), e);
                            } finally {
                              n(re());
                            }
                            return await de(n), a;
                          }
                        );
                      }),
                      (n.clearAccountDetails = function () {
                        return { type: v.CLEAR_ACCOUNT_DETAILS };
                      }),
                      (n.clearPendingTokens = function () {
                        return { type: v.CLEAR_PENDING_TOKENS };
                      }),
                      (n.clearSmartTransactionFees = function () {
                        (0, D.submitRequestToBackground)('clearSmartTransactionFees');
                      }),
                      (n.clearSwapsQuotes = function () {
                        return async e => {
                          await (0, D.submitRequestToBackground)('clearSwapsQuotes'), await de(e);
                        };
                      }),
                      (n.clearSwitchedNetworkDetails = function () {
                        return async e => {
                          await (0, D.submitRequestToBackground)('clearSwitchedNetworkDetails', []),
                            await de(e);
                        };
                      }),
                      (n.closeCurrentNotificationWindow = te),
                      (n.closeWelcomeScreen = function () {
                        return { type: v.CLOSE_WELCOME_SCREEN };
                      }),
                      (n.completeOnboarding = ce),
                      (n.completedTx = H),
                      (n.connectHardware = function (e, t, n, a, o) {
                        return (
                          r.default.debug('background.connectHardware', e, t, n),
                          async (r, i) => {
                            const { ledgerTransportType: c } = i().metamask;
                            let u;
                            r(ne(`Looking for your ${(0, s.capitalize)(e)}...`));
                            try {
                              if (
                                a &&
                                e === A.HardwareDeviceNames.ledger &&
                                c === A.LedgerTransportTypes.webhid
                              ) {
                                const e = await window.navigator.hid.requestDevice({
                                  filters: [{ vendorId: A.LEDGER_USB_VENDOR_ID }],
                                });
                                if (!e.some(e => e.vendorId === Number(A.LEDGER_USB_VENDOR_ID)))
                                  throw new Error(o('ledgerWebHIDNotConnectedErrorMessage'));
                              }
                              u = await (0, D.submitRequestToBackground)('connectHardware', [
                                e,
                                t,
                                n,
                              ]);
                            } catch (t) {
                              (0, y.logErrorWithMessage)(t);
                              const n = (0, y.getErrorMessage)(t);
                              throw e === A.HardwareDeviceNames.ledger &&
                                c === A.LedgerTransportTypes.webhid &&
                                (0, y.isErrorWithMessage)(t) &&
                                n.match('Failed to open the device')
                                ? (r(se(o('ledgerDeviceOpenFailureMessage'))),
                                  new Error(o('ledgerDeviceOpenFailureMessage')))
                                : (e !== A.HardwareDeviceNames.qr && r(se(t)), t);
                            } finally {
                              r(re());
                            }
                            return await de(r), u;
                          }
                        );
                      }),
                      (n.createCancelTransaction = function (e, t, n = {}) {
                        let a;
                        return (
                          r.default.debug('background.createCancelTransaction'),
                          r => {
                            const o = (0, D.generateActionId)();
                            return new Promise((s, i) => {
                              (0, D.callBackgroundMethod)(
                                'createCancelTransaction',
                                [e, t, { ...n, actionId: o }],
                                (t, n) => {
                                  var o;
                                  if (t)
                                    return (
                                      null != t &&
                                        null !== (o = t.message) &&
                                        void 0 !== o &&
                                        o.includes('Previous transaction is already confirmed') &&
                                        r(
                                          ee({
                                            name: 'TRANSACTION_ALREADY_CONFIRMED',
                                            originalTransactionId: e,
                                          })
                                        ),
                                      r(se(t)),
                                      void i(t)
                                    );
                                  if (n) {
                                    const e = (0, T.getCurrentNetworkTransactions)({ metamask: n }),
                                      { id: t } = e[e.length - 1];
                                    (a = t), s();
                                  }
                                }
                              );
                            })
                              .then(() => de(r))
                              .then(() => a);
                          }
                        );
                      }),
                      (n.createEventFragment = function (e) {
                        const t = (0, D.generateActionId)();
                        return (0, D.submitRequestToBackground)('createEventFragment', [
                          { ...e, actionId: t },
                        ]);
                      }),
                      (n.createMetaMetricsDataDeletionTask = async function () {
                        return await (0, D.submitRequestToBackground)(
                          'createMetaMetricsDataDeletionTask'
                        );
                      }),
                      (n.createNewVault = L),
                      (n.createNewVaultAndGetSeedPhrase = function (e) {
                        return async t => {
                          t(ne());
                          try {
                            await L(e);
                            return await q(e);
                          } catch (e) {
                            throw (
                              (t(se(e)),
                              (0, y.isErrorWithMessage)(e)
                                ? new Error((0, y.getErrorMessage)(e))
                                : e)
                            );
                          } finally {
                            t(re());
                          }
                        };
                      }),
                      (n.createNewVaultAndRestore = function (e, n) {
                        return a => {
                          a(ne()), r.default.debug('background.createNewVaultAndRestore');
                          const o = Array.from(t.from(n, 'utf8').values());
                          return new Promise((t, n) => {
                            (0, D.callBackgroundMethod)('createNewVaultAndRestore', [e, o], e => {
                              e ? n(e) : t();
                            });
                          })
                            .then(() => a(K()))
                            .then(() => {
                              a(Q()), a(re());
                            })
                            .catch(e => (a(se(e)), a(re()), Promise.reject(e)));
                        };
                      }),
                      (n.createOnChainTriggers = function () {
                        return async () => {
                          try {
                            await (0, D.submitRequestToBackground)('createOnChainTriggers');
                          } catch (e) {
                            throw ((0, y.logErrorWithMessage)(e), e);
                          }
                        };
                      }),
                      (n.createRetryTransaction = function (e, t) {
                        let n;
                        return a =>
                          new Promise((r, o) => {
                            const s = (0, D.generateActionId)();
                            (0, D.callBackgroundMethod)(
                              'createSpeedUpTransaction',
                              [e, t, { actionId: s }],
                              (e, t) => {
                                if (e) return a(se(e)), void o(e);
                                if (t) {
                                  const e = (0, T.getCurrentNetworkTransactions)(t);
                                  (n = e[e.length - 1]), r();
                                }
                              }
                            );
                          })
                            .then(() => de(a))
                            .then(() => n);
                      }),
                      (n.createSnapAccount = async function (e, t, n) {
                        return await (0, D.submitRequestToBackground)('createSnapAccount', [
                          e,
                          t,
                          n,
                        ]);
                      }),
                      (n.createSpeedUpTransaction = function (e, t, n = {}) {
                        let a;
                        return (
                          r.default.debug('background.createSpeedUpTransaction'),
                          r => {
                            const o = (0, D.generateActionId)();
                            return new Promise((s, i) => {
                              (0, D.callBackgroundMethod)(
                                'createSpeedUpTransaction',
                                [e, t, { ...n, actionId: o }],
                                (e, t) => {
                                  if (e) return r(se(e)), void i(e);
                                  if (t) {
                                    const e = (0, T.getCurrentNetworkTransactions)(t);
                                    (a = e[e.length - 1]), s();
                                  }
                                }
                              );
                            })
                              .then(() => de(r))
                              .then(() => a);
                          }
                        );
                      }),
                      (n.createTransactionEventFragment = function (e) {
                        const t = (0, D.generateActionId)();
                        return (0, D.submitRequestToBackground)('createTransactionEventFragment', [
                          { transactionId: e, actionId: t },
                        ]);
                      }),
                      (n.currencyRateStartPolling = async function (e) {
                        const t = await (0, D.submitRequestToBackground)(
                          'currencyRateStartPolling',
                          [{ nativeCurrencies: e }]
                        );
                        return await Ee(t), t;
                      }),
                      (n.currencyRateStopPollingByPollingToken = async function (e) {
                        await (0, D.submitRequestToBackground)(
                          'currencyRateStopPollingByPollingToken',
                          [e]
                        ),
                          await fe(e);
                      }),
                      (n.decodeTransactionData = async function ({
                        transactionData: e,
                        contractAddress: t,
                        chainId: n,
                      }) {
                        return await (0, D.submitRequestToBackground)('decodeTransactionData', [
                          { transactionData: e, contractAddress: t, chainId: n },
                        ]);
                      }),
                      (n.decryptMsg = function (e) {
                        return (
                          r.default.debug('action - decryptMsg'),
                          async t => {
                            t(ne()), r.default.debug('actions calling background.decryptMessage');
                            try {
                              await (0, D.submitRequestToBackground)('decryptMessage', [e]);
                            } catch (e) {
                              throw ((0, y.logErrorWithMessage)(e), t(se(e)), e);
                            } finally {
                              t(re());
                            }
                            return await de(t), t(H(e.metamaskId)), t(te()), e;
                          }
                        );
                      }),
                      (n.decryptMsgInline = function (e) {
                        return (
                          r.default.debug('action - decryptMsgInline'),
                          async t => {
                            r.default.debug('actions calling background.decryptMessageInline');
                            try {
                              await (0, D.submitRequestToBackground)('decryptMessageInline', [e]);
                            } catch (e) {
                              throw ((0, y.logErrorWithMessage)(e), t(se(e)), e);
                            }
                            return (await de(t)).unapprovedDecryptMsgs[e.metamaskId];
                          }
                        );
                      }),
                      (n.deleteAccountSyncingDataFromUserStorage = function () {
                        return async () => {
                          try {
                            return await (0, D.submitRequestToBackground)(
                              'deleteAccountSyncingDataFromUserStorage',
                              [c.USER_STORAGE_FEATURE_NAMES.accounts]
                            );
                          } catch (e) {
                            throw ((0, y.logErrorWithMessage)(e), e);
                          }
                        };
                      }),
                      (n.deleteExpiredNotifications = function () {
                        return async (e, t) => {
                          const n = t()
                            .metamask.metamaskNotificationsList.filter(e => {
                              const t = new Date(Date.now() - R.NOTIFICATIONS_EXPIRATION_DELAY);
                              return Boolean(e.readDate && new Date(e.readDate) < t);
                            })
                            .map(({ id: e }) => e);
                          n.length &&
                            (await (0, D.submitRequestToBackground)('deleteNotificationsById', [n]),
                            await de(e));
                        };
                      }),
                      (n.deleteInterface = function (e) {
                        return async t => {
                          await (0, D.submitRequestToBackground)('deleteInterface', [e]),
                            await de(t);
                        };
                      }),
                      (n.deleteNotificationsById = function (e) {
                        return async () => {
                          try {
                            return await (0, D.submitRequestToBackground)(
                              'deleteNotificationsById',
                              [e]
                            );
                          } catch (e) {
                            throw ((0, y.logErrorWithMessage)(e), e);
                          }
                        };
                      }),
                      (n.deleteOnChainTriggersByAccount = function (e) {
                        return async () => {
                          try {
                            await (0, D.submitRequestToBackground)(
                              'deleteOnChainTriggersByAccount',
                              [e]
                            );
                          } catch (e) {
                            throw ((0, y.logErrorWithMessage)(e), e);
                          }
                        };
                      }),
                      (n.detectNfts = function (e) {
                        return async t => {
                          t(ae()), r.default.debug('background.detectNfts');
                          try {
                            await (0, D.submitRequestToBackground)('detectNfts', [e]);
                          } finally {
                            t(oe());
                          }
                          await de(t);
                        };
                      }),
                      (n.detectTokens = function () {
                        return async e => {
                          e(ne()),
                            r.default.debug('background.detectTokens'),
                            await (0, D.submitRequestToBackground)('detectTokens'),
                            e(re()),
                            await de(e);
                        };
                      }),
                      (n.disableAccountUpgradeForChain = async function (e) {
                        return await (0, D.submitRequestToBackground)(
                          'disableAccountUpgradeForChain',
                          [e]
                        );
                      }),
                      (n.disableMetamaskNotifications = function () {
                        return async () => {
                          try {
                            await (0, D.submitRequestToBackground)('disableMetamaskNotifications');
                          } catch (e) {
                            throw (r.default.error(e), e);
                          }
                        };
                      }),
                      (n.disableProfileSyncing = function () {
                        return async () => {
                          try {
                            await (0, D.submitRequestToBackground)('disableProfileSyncing');
                          } catch (e) {
                            throw ((0, y.logErrorWithMessage)(e), e);
                          }
                        };
                      }),
                      (n.disableSnap = function (e) {
                        return async t => {
                          await (0, D.submitRequestToBackground)('disableSnap', [e]), await de(t);
                        };
                      }),
                      (n.disconnectOriginFromSnap = function (e, t) {
                        return async n => {
                          await (0, D.submitRequestToBackground)('disconnectOriginFromSnap', [
                            e,
                            t,
                          ]),
                            await de(n);
                        };
                      }),
                      (n.dismissSmartTransactionsErrorMessage = function () {
                        return { type: v.DISMISS_SMART_TRANSACTIONS_ERROR_MESSAGE };
                      }),
                      (n.displayWarning = se),
                      (n.enableMetamaskNotifications = function () {
                        return async () => {
                          try {
                            await (0, D.submitRequestToBackground)('enableMetamaskNotifications');
                          } catch (e) {
                            throw (r.default.error(e), e);
                          }
                        };
                      }),
                      (n.enableProfileSyncing = function () {
                        return async () => {
                          try {
                            await (0, D.submitRequestToBackground)('enableProfileSyncing');
                          } catch (e) {
                            throw ((0, y.logErrorWithMessage)(e), e);
                          }
                        };
                      }),
                      (n.enableSnap = function (e) {
                        return async t => {
                          await (0, D.submitRequestToBackground)('enableSnap', [e]), await de(t);
                        };
                      }),
                      (n.encryptionPublicKeyMsg = function (e) {
                        return (
                          r.default.debug('action - encryptionPublicKeyMsg'),
                          async t => {
                            t(ne()),
                              r.default.debug('actions calling background.encryptionPublicKey');
                            try {
                              await (0, D.submitRequestToBackground)('encryptionPublicKey', [e]);
                            } catch (e) {
                              throw ((0, y.logErrorWithMessage)(e), t(se(e)), e);
                            } finally {
                              t(re());
                            }
                            return await de(t), t(H(e.metamaskId)), t(te()), e;
                          }
                        );
                      }),
                      (n.endBackgroundTrace = async function (e) {
                        const t = e.timestamp || performance.timeOrigin + performance.now();
                        await (0, D.submitRequestToBackground)('endTrace', [
                          { ...e, timestamp: t },
                        ]);
                      }),
                      (n.estimateGas = function (e) {
                        return (0, D.submitRequestToBackground)('estimateGas', [e]);
                      }),
                      (n.exportAccount = function (e, t, n, a) {
                        return function (o) {
                          return (
                            o(ne()),
                            r.default.debug('background.verifyPassword'),
                            new Promise((s, i) => {
                              (0, D.callBackgroundMethod)('verifyPassword', [e], function (c) {
                                if (c)
                                  return (
                                    r.default.error('Error in verifying password.'),
                                    o(re()),
                                    o(se('Incorrect Password.')),
                                    void i(c)
                                  );
                                r.default.debug('background.exportAccount'),
                                  (0, D.callBackgroundMethod)(
                                    'exportAccount',
                                    [t, e],
                                    function (e, t) {
                                      if ((o(re()), e))
                                        return (
                                          (0, y.logErrorWithMessage)(e),
                                          o(se('Had a problem exporting the account.')),
                                          void i(e)
                                        );
                                      n(t), a(!0), s(t);
                                    }
                                  );
                              });
                            })
                          );
                        };
                      }),
                      (n.exportAccounts = function (e, t) {
                        return function (n) {
                          return (
                            r.default.debug('background.verifyPassword'),
                            new Promise((a, o) => {
                              (0, D.callBackgroundMethod)('verifyPassword', [e], function (s) {
                                if (s)
                                  return (
                                    r.default.error('Error in submitting password.'), void o(s)
                                  );
                                r.default.debug('background.exportAccounts');
                                const i = t.map(
                                  t =>
                                    new Promise((a, r) =>
                                      (0, D.callBackgroundMethod)(
                                        'exportAccount',
                                        [t, e],
                                        function (e, t) {
                                          if (e)
                                            return (
                                              (0, y.logErrorWithMessage)(e),
                                              n(se('Had a problem exporting the account.')),
                                              void r(e)
                                            );
                                          a(t);
                                        }
                                      )
                                    )
                                );
                                a(Promise.all(i));
                              });
                            })
                          );
                        };
                      }),
                      (n.fetchAndSetQuotes = function (e, t) {
                        return async n => {
                          const [a, r] = await (0, D.submitRequestToBackground)(
                            'fetchAndSetQuotes',
                            [e, t]
                          );
                          return await de(n), [a, r];
                        };
                      }),
                      (n.fetchAndUpdateMetamaskNotifications = function (e) {
                        return async () => {
                          try {
                            return await (0, D.submitRequestToBackground)(
                              'fetchAndUpdateMetamaskNotifications',
                              [e]
                            );
                          } catch (e) {
                            throw ((0, y.logErrorWithMessage)(e), e);
                          }
                        };
                      }),
                      (n.fetchSmartTransactionFees = function (e, t) {
                        return async n => {
                          t && (t.value = '0x0');
                          try {
                            const a = await await (0, D.submitRequestToBackground)(
                              'fetchSmartTransactionFees',
                              [e, t]
                            );
                            return n({ type: v.SET_SMART_TRANSACTIONS_ERROR, payload: null }), a;
                          } catch (e) {
                            if (((0, y.logErrorWithMessage)(e), (0, y.isErrorWithMessage)(e))) {
                              const t = (0, y.getErrorMessage)(e);
                              if (t.startsWith('Fetch error:')) {
                                const e = (0, h.parseSmartTransactionsError)(t);
                                n({ type: v.SET_SMART_TRANSACTIONS_ERROR, payload: e });
                              }
                            }
                            throw e;
                          }
                        };
                      }),
                      (n.fetchSmartTransactionsLiveness = function () {
                        return async () => {
                          try {
                            await (0, D.submitRequestToBackground)(
                              'fetchSmartTransactionsLiveness'
                            );
                          } catch (e) {
                            (0, y.logErrorWithMessage)(e);
                          }
                        };
                      }),
                      (n.finalizeEventFragment = function (e, t) {
                        return (0, D.submitRequestToBackground)('finalizeEventFragment', [e, t]);
                      }),
                      (n.forceUpdateMetamaskState = de),
                      (n.forgetDevice = function (e) {
                        return (
                          r.default.debug('background.forgetDevice', e),
                          async t => {
                            t(ne());
                            try {
                              await (0, D.submitRequestToBackground)('forgetDevice', [e]);
                            } catch (e) {
                              throw ((0, y.logErrorWithMessage)(e), t(se(e)), e);
                            } finally {
                              t(re());
                            }
                            await de(t);
                          }
                        );
                      }),
                      (n.gasFeeStartPollingByNetworkClientId = async function (e) {
                        const t = await (0, D.submitRequestToBackground)('gasFeeStartPolling', [
                          { networkClientId: e },
                        ]);
                        return await Ee(t), t;
                      }),
                      (n.gasFeeStopPollingByPollingToken = async function (e) {
                        await (0, D.submitRequestToBackground)('gasFeeStopPollingByPollingToken', [
                          e,
                        ]),
                          await fe(e);
                      }),
                      (n.generateNewMnemonicAndAddToVault = function () {
                        return e => (
                          e(ne()),
                          r.default.debug('background.generateNewMnemonicAndAddToVault'),
                          new Promise((e, t) => {
                            (0, D.callBackgroundMethod)(
                              'generateNewMnemonicAndAddToVault',
                              [],
                              n => {
                                n ? t(n) : e();
                              }
                            );
                          })
                            .then(async () => {
                              e(re());
                            })
                            .catch(t => (e(se(t)), e(re()), Promise.reject(t)))
                        );
                      }),
                      (n.getBalancesInSingleCall = async function (e, t, n) {
                        return await (0, D.submitRequestToBackground)('getBalancesInSingleCall', [
                          e,
                          t,
                          n,
                        ]);
                      }),
                      (n.getCode = async function (e, t) {
                        return await (0, D.submitRequestToBackground)('getCode', [e, t]);
                      }),
                      (n.getContractMethodData = function (e = '') {
                        return async (t, n) => {
                          const a = (0, g.addHexPrefix)(e).slice(0, 10);
                          if (a.length < 10) return {};
                          const { knownMethodData: o, use4ByteResolution: s } = n().metamask;
                          if (null != o && o[a] && 0 !== Object.keys(o[a]).length) return o[a];
                          r.default.debug('loadingMethodData');
                          const { name: i, params: c } = await (0, w.getMethodDataAsync)(a, s);
                          return (
                            (0, D.callBackgroundMethod)(
                              'addKnownMethodData',
                              [a, { name: i, params: c }],
                              e => {
                                e && t(se(e));
                              }
                            ),
                            { name: i, params: c }
                          );
                        };
                      }),
                      (n.getCurrentNetworkEIP1559Compatibility = async function () {
                        let e;
                        try {
                          e = await (0, D.submitRequestToBackground)(
                            'getCurrentNetworkEIP1559Compatibility'
                          );
                        } catch (e) {
                          console.error(e);
                        }
                        return e;
                      }),
                      (n.getGasFeeTimeEstimate = function (e, t) {
                        return (0, D.submitRequestToBackground)('getGasFeeTimeEstimate', [e, t]);
                      }),
                      (n.getLastInteractedConfirmationInfo = async function () {
                        return await (0, D.submitRequestToBackground)(
                          'getLastInteractedConfirmationInfo'
                        );
                      }),
                      (n.getLayer1GasFee = function ({
                        chainId: e,
                        networkClientId: t,
                        transactionParams: n,
                      }) {
                        return async () =>
                          await (0, D.submitRequestToBackground)('getLayer1GasFee', [
                            { chainId: e, networkClientId: t, transactionParams: n },
                          ]);
                      }),
                      (n.getNFTContractInfo = async function (e, t) {
                        return await (0, D.submitRequestToBackground)('getNFTContractInfo', [e, t]);
                      }),
                      (n.getNetworkConfigurationByNetworkClientId = async function (e) {
                        let t;
                        try {
                          t = await (0, D.submitRequestToBackground)(
                            'getNetworkConfigurationByNetworkClientId',
                            [e]
                          );
                        } catch (e) {
                          console.error(e);
                        }
                        return t;
                      }),
                      (n.getNextAvailableAccountName = async function (e) {
                        return await (0, D.submitRequestToBackground)(
                          'getNextAvailableAccountName',
                          [e]
                        );
                      }),
                      (n.getNextNonce = function (e) {
                        return async (t, n) => {
                          const a = (0, m.getSelectedNetworkClientId)(n());
                          let r;
                          try {
                            r = await (0, D.submitRequestToBackground)('getNextNonce', [e, a]);
                          } catch (e) {
                            throw (t(se(e)), e);
                          }
                          return t(me(r)), r;
                        };
                      }),
                      (n.getOpenMetamaskTabsIds = function () {
                        return async e => {
                          e(Se(await (0, D.submitRequestToBackground)('getOpenMetamaskTabsIds')));
                        };
                      }),
                      (n.getPhishingResult = async function (e) {
                        return await (0, D.submitRequestToBackground)('getPhishingResult', [e]);
                      }),
                      (n.getRequestAccountTabIds = function () {
                        return async e => {
                          e(pe(await (0, D.submitRequestToBackground)('getRequestAccountTabIds')));
                        };
                      }),
                      (n.getRpcMethodPreferences = function () {
                        return async e => {
                          e(ne()),
                            await (0, D.submitRequestToBackground)('getRpcMethodPreferences', []),
                            e(re());
                        };
                      }),
                      (n.getSeedPhrase = q),
                      (n.getSnapAccountsById = async function (e) {
                        return await (0, D.submitRequestToBackground)('getAccountsBySnapId', [e]);
                      }),
                      (n.getTokenStandardAndDetails = async function (e, t, n) {
                        return await (0, D.submitRequestToBackground)(
                          'getTokenStandardAndDetails',
                          [e, t, n]
                        );
                      }),
                      (n.getTokenStandardAndDetailsByChain = async function (e, t, n, a) {
                        return await (0, D.submitRequestToBackground)(
                          'getTokenStandardAndDetailsByChain',
                          [e, t, n, a]
                        );
                      }),
                      (n.getTokenSymbol = async function (e) {
                        return await (0, D.submitRequestToBackground)('getTokenSymbol', [e]);
                      }),
                      (n.getTransactions = async function (e = {}) {
                        return await (0, D.submitRequestToBackground)('getTransactions', [e]);
                      }),
                      (n.goHome = b),
                      (n.handleSnapRequest = G),
                      (n.hideAccountBanner = function () {
                        return (0, D.submitRequestToBackground)('setShowAccountBanner', [!1]);
                      }),
                      (n.hideAlert = function () {
                        return { type: v.ALERT_CLOSE };
                      }),
                      (n.hideBetaHeader = function () {
                        return (0, D.submitRequestToBackground)('setShowBetaHeader', [!1]);
                      }),
                      (n.hideDeprecatedNetworkModal = function () {
                        return { type: v.DEPRECATED_NETWORK_POPOVER_CLOSE };
                      }),
                      (n.hideImportNftsModal = function () {
                        return { type: v.IMPORT_NFTS_MODAL_CLOSE };
                      }),
                      (n.hideImportTokensModal = function () {
                        return { type: v.IMPORT_TOKENS_POPOVER_CLOSE };
                      }),
                      (n.hideIpfsModal = function () {
                        return { type: v.SHOW_IPFS_MODAL_CLOSE };
                      }),
                      (n.hideKeyringRemovalResultModal = function () {
                        return { type: v.HIDE_KEYRING_SNAP_REMOVAL_RESULT };
                      }),
                      (n.hideLoadingIndication = re),
                      (n.hideModal = function () {
                        return { type: v.MODAL_CLOSE };
                      }),
                      (n.hideNetworkBanner = function () {
                        return (0, D.submitRequestToBackground)('setShowNetworkBanner', [!1]);
                      }),
                      (n.hideNetworkDropdown = function () {
                        return { type: v.NETWORK_DROPDOWN_CLOSE };
                      }),
                      (n.hideNftStillFetchingIndication = oe),
                      (n.hidePermissionsTour = function () {
                        return (0, D.submitRequestToBackground)('setShowPermissionsTour', [!1]);
                      }),
                      (n.hidePermittedNetworkToast = function () {
                        return { type: v.SHOW_PERMITTED_NETWORK_TOAST_CLOSE };
                      }),
                      (n.hideTestNetMessage = function () {
                        return (0, D.submitRequestToBackground)('setShowTestnetMessageInDropdown', [
                          !1,
                        ]);
                      }),
                      (n.hideWarning = function () {
                        return { type: v.HIDE_WARNING };
                      }),
                      (n.ignoreTokens = function ({
                        tokensToIgnore: e,
                        dontShowLoadingIndicator: t = !1,
                        networkClientId: n = null,
                      }) {
                        const a = Array.isArray(e) ? e : [e];
                        return async e => {
                          t || e(ne());
                          try {
                            await (0, D.submitRequestToBackground)('ignoreTokens', [a, n]);
                          } catch (t) {
                            (0, y.logErrorWithMessage)(t), e(se(t));
                          } finally {
                            await de(e), e(re());
                          }
                        };
                      }),
                      (n.importMnemonicToVault = function (e) {
                        return t => (
                          t(ne()),
                          r.default.debug('background.importMnemonicToVault'),
                          new Promise((t, n) => {
                            (0, D.callBackgroundMethod)('importMnemonicToVault', [e], e => {
                              e ? n(e) : t();
                            });
                          })
                            .then(async () => {
                              t(re());
                            })
                            .catch(e => (t(se(e)), t(re()), Promise.reject(e)))
                        );
                      }),
                      (n.importNewAccount = function (e, t, n) {
                        return async a => {
                          a(ne(n));
                          try {
                            r.default.debug('background.importAccountWithStrategy'),
                              await (0, D.submitRequestToBackground)('importAccountWithStrategy', [
                                e,
                                t,
                              ]);
                          } finally {
                            a(re());
                          }
                          return await de(a);
                        };
                      }),
                      (n.isNftOwner = async function (e, t, n) {
                        return await (0, D.submitRequestToBackground)('isNftOwner', [e, t, n]);
                      }),
                      (n.lockMetamask = function () {
                        return (
                          r.default.debug('background.setLocked'),
                          e => (
                            e(ne()),
                            $()
                              .then(() => de(e))
                              .catch(t => (e(se((0, y.getErrorMessage)(t))), Promise.reject(t)))
                              .then(() => {
                                e(re()), e({ type: v.LOCK_METAMASK });
                              })
                              .catch(() => {
                                e(re()), e({ type: v.LOCK_METAMASK });
                              })
                          )
                        );
                      }),
                      (n.markMetamaskNotificationsAsRead = function (e) {
                        return async () => {
                          try {
                            await (0, D.submitRequestToBackground)(
                              'markMetamaskNotificationsAsRead',
                              [e]
                            );
                          } catch (e) {
                            throw ((0, y.logErrorWithMessage)(e), e);
                          }
                        };
                      }),
                      (n.markPasswordForgotten = function () {
                        return async e => {
                          try {
                            await new Promise((e, t) => {
                              (0, D.callBackgroundMethod)('markPasswordForgotten', [], n => {
                                n ? t(n) : e();
                              });
                            });
                          } finally {
                            e(re()), await de(e);
                          }
                        };
                      }),
                      (n.multichainUpdateBalance = async function (e) {
                        return await (0, D.submitRequestToBackground)('multichainUpdateBalance', [
                          e,
                        ]);
                      }),
                      (n.multichainUpdateTransactions = async function (e) {
                        return await (0, D.submitRequestToBackground)(
                          'multichainUpdateTransactions',
                          [e]
                        );
                      }),
                      (n.performSignIn = function () {
                        return async () => {
                          try {
                            await (0, D.submitRequestToBackground)('performSignIn');
                          } catch (e) {
                            const t =
                              e instanceof Error
                                ? e.message
                                : 'Unknown error occurred during sign-in.';
                            throw ((0, y.logErrorWithMessage)(t), e);
                          }
                        };
                      }),
                      (n.performSignOut = function () {
                        return async () => {
                          try {
                            await (0, D.submitRequestToBackground)('performSignOut');
                          } catch (e) {
                            throw ((0, y.logErrorWithMessage)(e), e);
                          }
                        };
                      }),
                      (n.qrCodeDetected = function (e) {
                        return async t => {
                          await t({ type: v.QR_CODE_DETECTED, value: e }),
                            t((0, p.computeEstimatedGasLimit)());
                        };
                      }),
                      (n.rejectAllApprovals = function () {
                        return async e => {
                          await (0, D.submitRequestToBackground)('rejectAllPendingApprovals');
                          const { pendingApprovals: t } = await de(e);
                          0 === Object.values(t).length && e(te());
                        };
                      }),
                      (n.rejectAllMessages = function (e) {
                        return async t => {
                          const n = (0, i.serializeError)(i.providerErrors.userRejectedRequest());
                          await Promise.all(
                            e.map(
                              async ({ id: e }) =>
                                await (0, D.submitRequestToBackground)('rejectPendingApproval', [
                                  e,
                                  n,
                                ])
                            )
                          );
                          const { pendingApprovals: a } = await de(t);
                          0 === Object.values(a).length && t(te());
                        };
                      }),
                      (n.rejectPendingApproval = function (e, t) {
                        return async n => {
                          await (0, D.submitRequestToBackground)('rejectPendingApproval', [e, t]);
                          const { pendingApprovals: a } = await de(n);
                          0 === Object.values(a).length && n(te());
                        };
                      }),
                      (n.rejectPermissionsRequest = function (e) {
                        return t =>
                          new Promise((n, a) => {
                            (0, D.callBackgroundMethod)('rejectPermissionsRequest', [e], e => {
                              if (e) return t(se(e)), void a(e);
                              de(t).then(n).catch(a);
                            });
                          });
                      }),
                      (n.removeAccount = function (e) {
                        return async t => {
                          t(ne());
                          try {
                            await new Promise((t, n) => {
                              (0, D.callBackgroundMethod)('removeAccount', [e], (e, a) => {
                                e ? n(e) : t(a);
                              });
                            }),
                              await de(t);
                          } catch (e) {
                            throw (t(se(e)), e);
                          } finally {
                            t(re());
                          }
                          r.default.info(`Account removed: ${e}`), t(Q());
                        };
                      }),
                      (n.removeAndIgnoreNft = function (e, t, n, a) {
                        return async r => {
                          if (!e) throw new Error('MetaMask - Cannot ignore NFT without address');
                          if (!t) throw new Error('MetaMask - Cannot ignore NFT without tokenID');
                          a || r(ne());
                          try {
                            await (0, D.submitRequestToBackground)('removeAndIgnoreNft', [
                              e,
                              t,
                              { networkClientId: n },
                            ]);
                          } catch (e) {
                            throw ((0, y.logErrorWithMessage)(e), r(se(e)), e);
                          } finally {
                            await de(r), r(re());
                          }
                        };
                      }),
                      (n.removeFromAddressBook = function (e, t) {
                        return (
                          r.default.debug('background.removeFromAddressBook'),
                          async n => {
                            await (0, D.submitRequestToBackground)('removeFromAddressBook', [
                              e,
                              (0, f.toChecksumHexAddress)(t),
                            ]),
                              await de(n);
                          }
                        );
                      }),
                      (n.removeNetwork = function (e) {
                        return async () => {
                          try {
                            await (0, D.submitRequestToBackground)('removeNetwork', [e]);
                          } catch (e) {
                            (0, y.logErrorWithMessage)(e);
                          }
                        };
                      }),
                      (n.removeNft = function (e, t, n) {
                        return async a => {
                          if (!e) throw new Error('MetaMask - Cannot remove NFT without address');
                          if (!t) throw new Error('MetaMask - Cannot remove NFT without tokenID');
                          n || a(ne());
                          try {
                            await (0, D.submitRequestToBackground)('removeNft', [e, t]);
                          } catch (e) {
                            (0, y.logErrorWithMessage)(e), a(se(e));
                          } finally {
                            await de(a), a(re());
                          }
                        };
                      }),
                      (n.removePermissionsFor = function (e) {
                        return t => {
                          (0, D.callBackgroundMethod)('removePermissionsFor', [e], e => {
                            e && t(se(e));
                          });
                        };
                      }),
                      (n.removePermittedAccount = function (e, t) {
                        return async n => {
                          await new Promise((n, a) => {
                            (0, D.callBackgroundMethod)('removePermittedAccount', [e, t], e => {
                              e ? a(e) : n();
                            });
                          }),
                            await de(n);
                        };
                      }),
                      (n.removePermittedChain = function (e, t) {
                        return async n => {
                          await new Promise((n, a) => {
                            (0, D.callBackgroundMethod)('removePermittedChain', [e, t], e => {
                              e ? a(e) : n();
                            });
                          }),
                            await de(n);
                        };
                      }),
                      (n.removePollingTokenFromAppState = fe),
                      (n.removeSlide = function (e) {
                        return async () => {
                          try {
                            await (0, D.submitRequestToBackground)('removeSlide', [e]);
                          } catch (e) {
                            throw ((0, y.logErrorWithMessage)(e), e);
                          }
                        };
                      }),
                      (n.removeSnap = function (e) {
                        return async (t, n) => {
                          var a;
                          t(ne());
                          const r =
                            (null === (a = (0, T.getPermissionSubjects)(n())[e]) ||
                            void 0 === a ||
                            null === (a = a.permissions) ||
                            void 0 === a
                              ? void 0
                              : a.snap_manageAccounts) !== undefined;
                          try {
                            if (r) {
                              const t = await (0, D.submitRequestToBackground)(
                                'getAccountsBySnapId',
                                [e]
                              );
                              for (const e of t)
                                await (0, D.submitRequestToBackground)('removeAccount', [e]);
                            }
                            await (0, D.submitRequestToBackground)('removeSnap', [e]), await de(t);
                          } catch (e) {
                            throw (t(se(e)), e);
                          } finally {
                            t(re());
                          }
                        };
                      }),
                      (n.requestAccountsAndChainPermissionsWithId = function (e) {
                        return async t => {
                          const n = await (0, D.submitRequestToBackground)(
                            'requestAccountsAndChainPermissionsWithId',
                            [e]
                          );
                          return await de(t), n;
                        };
                      }),
                      (n.requestRevealSeedWords = function (e, t) {
                        return async n => {
                          n(ne()), r.default.debug('background.verifyPassword');
                          try {
                            await U(e);
                            return await q(e, t);
                          } finally {
                            n(re());
                          }
                        };
                      }),
                      (n.requestUserApproval = function ({ origin: e, type: t, requestData: n }) {
                        return async a => {
                          try {
                            await (0, D.submitRequestToBackground)('requestUserApproval', [
                              { origin: e, type: t, requestData: n },
                            ]);
                          } catch (e) {
                            (0, y.logErrorWithMessage)(e),
                              a(se('Had trouble requesting user approval'));
                          }
                        };
                      }),
                      (n.resetAccount = function () {
                        return e => (
                          e(ne()),
                          new Promise((t, n) => {
                            (0, D.callBackgroundMethod)('resetAccount', [], (a, o) => {
                              if ((e(re()), a))
                                return (0, y.isErrorWithMessage)(a) && e(se(a)), void n(a);
                              r.default.info(`Transaction history reset for ${o}`), e(Q()), t(o);
                            });
                          })
                        );
                      }),
                      (n.resetBackgroundSwapsState = function () {
                        return async e => {
                          await (0, D.submitRequestToBackground)('resetSwapsState'), await de(e);
                        };
                      }),
                      (n.resetOnboarding = function () {
                        return async e => {
                          try {
                            await e(Te(!1)), e(ue());
                          } catch (e) {
                            console.error(e);
                          }
                        };
                      }),
                      (n.resetOnboardingAction = ue),
                      (n.resetSwapsPostFetchState = function () {
                        return async e => {
                          await (0, D.submitRequestToBackground)('resetPostFetchState'),
                            await de(e);
                        };
                      }),
                      (n.resetViewedNotifications = function () {
                        return (0, D.submitRequestToBackground)('resetViewedNotifications');
                      }),
                      (n.resolvePendingApproval = function (e, t) {
                        return async n => {
                          await (0, D.submitRequestToBackground)('resolvePendingApproval', [e, t]);
                          const { pendingApprovals: a } = await de(n);
                          0 === Object.values(a).length && n(te());
                        };
                      }),
                      (n.restoreUserData = async function (e) {
                        try {
                          await (0, D.submitRequestToBackground)('restoreUserData', [e]);
                        } catch (e) {
                          throw ((0, y.logErrorWithMessage)(e), e);
                        }
                        return !0;
                      }),
                      (n.revokeDynamicSnapPermissions = function (e, t) {
                        return async n => {
                          await (0, D.submitRequestToBackground)('revokeDynamicSnapPermissions', [
                            e,
                            t,
                          ]),
                            await de(n);
                        };
                      }),
                      (n.rollbackToPreviousProvider = function () {
                        return async e => {
                          try {
                            await (0, D.submitRequestToBackground)('rollbackToPreviousProvider');
                          } catch (t) {
                            (0, y.logErrorWithMessage)(t),
                              e(se('Had a problem changing networks!'));
                          }
                        };
                      }),
                      (n.safeRefetchQuotes = function () {
                        return async e => {
                          await (0, D.submitRequestToBackground)('safeRefetchQuotes'), await de(e);
                        };
                      }),
                      (n.sendMultichainTransaction = async function (
                        e,
                        { account: t, scope: n, assetType: a }
                      ) {
                        await G({
                          snapId: e,
                          origin: 'metamask',
                          handler: u.HandlerType.OnRpcRequest,
                          request: {
                            method: 'startSendTransactionFlow',
                            params: { account: t, scope: n, assetId: a },
                          },
                        });
                      }),
                      (n.setAccountDetailsAddress = function (e) {
                        return { type: v.SET_ACCOUNT_DETAILS_ADDRESS, payload: e };
                      }),
                      (n.setAccountLabel = function (e, t) {
                        return n => (
                          n(ne()),
                          r.default.debug('background.setAccountLabel'),
                          new Promise((a, r) => {
                            (0, D.callBackgroundMethod)('setAccountLabel', [e, t], o => {
                              if ((n(re()), o)) return n(se(o)), void r(o);
                              n({ type: v.SET_ACCOUNT_LABEL, value: { account: e, label: t } }),
                                a(e);
                            });
                          })
                        );
                      }),
                      (n.setActiveNetwork = function (e) {
                        return async t => {
                          r.default.debug(`background.setActiveNetwork: ${e}`);
                          try {
                            await (0, D.submitRequestToBackground)('setActiveNetwork', [e]);
                          } catch (e) {
                            (0, y.logErrorWithMessage)(e),
                              t(se('Had a problem changing networks!'));
                          }
                        };
                      }),
                      (n.setActiveNetworkConfigurationId = J),
                      (n.setActiveNetworkWithError = function (e) {
                        return async t => {
                          r.default.debug(`background.setActiveNetwork: ${e}`);
                          try {
                            await (0, D.submitRequestToBackground)('setActiveNetwork', [e]);
                          } catch (e) {
                            throw (
                              ((0, y.logErrorWithMessage)(e),
                              t(se('Had a problem changing networks!')),
                              new Error('Had a problem changing networks!'))
                            );
                          }
                        };
                      }),
                      (n.setAddSnapAccountEnabled = async function (e) {
                        try {
                          await (0, D.submitRequestToBackground)('setAddSnapAccountEnabled', [e]);
                        } catch (e) {
                          (0, y.logErrorWithMessage)(e);
                        }
                      }),
                      (n.setAdvancedGasFee = function (e) {
                        return t => {
                          t(ne()),
                            r.default.debug('background.setAdvancedGasFee'),
                            (0, D.callBackgroundMethod)('setAdvancedGasFee', [e], e => {
                              t(re()), e && t(se(e));
                            });
                        };
                      }),
                      (n.setAggregatedBalancePopoverShown = function () {
                        return ie('shouldShowAggregatedBalancePopover', !1);
                      }),
                      (n.setAlertEnabledness = async function (e, t) {
                        await (0, D.submitRequestToBackground)('setAlertEnabledness', [e, t]);
                      }),
                      (n.setAutoLockTimeLimit = function (e) {
                        return ie('autoLockTimeLimit', e);
                      }),
                      (n.setBackgroundSwapRouteState = function (e) {
                        return async t => {
                          await (0, D.submitRequestToBackground)('setBackgroundSwapRouteState', [
                            e,
                          ]),
                            await de(t);
                        };
                      }),
                      (n.setCompletedOnboarding = function () {
                        return async e => {
                          e(ne());
                          try {
                            await (0, D.submitRequestToBackground)('completeOnboarding'), e(ce());
                          } catch (t) {
                            throw (e(se(t)), t);
                          } finally {
                            e(re());
                          }
                        };
                      }),
                      (n.setConfirmationAdvancedDetailsOpen = function (e) {
                        return ie('showConfirmationAdvancedDetails', e);
                      }),
                      (n.setConfirmationExchangeRates = function (e) {
                        return { type: v.SET_CONFIRMATION_EXCHANGE_RATES, value: e };
                      }),
                      (n.setConnectedStatusPopoverHasBeenShown = function () {
                        return () => {
                          (0, D.callBackgroundMethod)(
                            'setConnectedStatusPopoverHasBeenShown',
                            [],
                            e => {
                              if ((0, y.isErrorWithMessage)(e))
                                throw new Error((0, y.getErrorMessage)(e));
                            }
                          );
                        };
                      }),
                      (n.setCurrentCurrency = function (e) {
                        return async t => {
                          t(ne()), r.default.debug('background.setCurrentCurrency');
                          try {
                            await (0, D.submitRequestToBackground)('setCurrentCurrency', [e]),
                              await de(t);
                          } catch (e) {
                            return (0, y.logErrorWithMessage)(e), void t(se(e));
                          } finally {
                            t(re());
                          }
                        };
                      }),
                      (n.setCurrentExtensionPopupId = function (e) {
                        return async t => {
                          await (0, D.submitRequestToBackground)('setCurrentExtensionPopupId', [e]),
                            await de(t);
                        };
                      }),
                      (n.setCurrentLocale = ge),
                      (n.setCustomApproveTxData = function (e) {
                        return async t => {
                          await (0, D.submitRequestToBackground)('setCustomApproveTxData', [e]),
                            await de(t);
                        };
                      }),
                      (n.setDataCollectionForMarketing = function (e) {
                        return async t => {
                          r.default.debug('background.setDataCollectionForMarketing'),
                            await (0, D.submitRequestToBackground)(
                              'setDataCollectionForMarketing',
                              [e]
                            ),
                            t({ type: v.SET_DATA_COLLECTION_FOR_MARKETING, value: e });
                        };
                      }),
                      (n.setDefaultHomeActiveTabName = function (e) {
                        return async t => {
                          await (0, D.submitRequestToBackground)('setDefaultHomeActiveTabName', [
                            e,
                          ]),
                            await de(t);
                        };
                      }),
                      (n.setDismissSeedBackUpReminder = function (e) {
                        return async t => {
                          t(ne()),
                            await (0, D.submitRequestToBackground)('setDismissSeedBackUpReminder', [
                              e,
                            ]),
                            t(re());
                        };
                      }),
                      (n.setDismissSmartAccountSuggestionEnabled = function (e) {
                        return ie('dismissSmartAccountSuggestionEnabled', e);
                      }),
                      (n.setEditedNetwork = function (e = undefined) {
                        return { type: v.SET_EDIT_NETWORK, payload: e };
                      }),
                      (n.setFeatureAnnouncementsEnabled = function (e) {
                        return async () => {
                          try {
                            await (0, D.submitRequestToBackground)(
                              'setFeatureAnnouncementsEnabled',
                              [e]
                            );
                          } catch (e) {
                            throw ((0, y.logErrorWithMessage)(e), e);
                          }
                        };
                      }),
                      (n.setFeatureFlag = function (e, t, n) {
                        return a => (
                          a(ne()),
                          new Promise((r, o) => {
                            (0, D.callBackgroundMethod)('setFeatureFlag', [e, t], (e, t) => {
                              if ((a(re()), e)) return a(se(e)), void o(e);
                              n && a(ee({ name: n })), r(t);
                            });
                          })
                        );
                      }),
                      (n.setFeatureNotificationsEnabled = function (e) {
                        return ie('featureNotificationsEnabled', e);
                      }),
                      (n.setFirstTimeFlowType = function (e) {
                        return async t => {
                          try {
                            r.default.debug('background.setFirstTimeFlowType'),
                              await (0, D.submitRequestToBackground)('setFirstTimeFlowType', [e]),
                              t({ type: v.SET_FIRST_TIME_FLOW_TYPE, value: e });
                          } catch (e) {
                            t(se(e));
                          }
                        };
                      }),
                      (n.setHardwareWalletDefaultHdPath = function ({ device: e, path: t }) {
                        return {
                          type: v.SET_HARDWARE_WALLET_DEFAULT_HD_PATH,
                          payload: { device: e, path: t },
                        };
                      }),
                      (n.setHideZeroBalanceTokens = function (e) {
                        return ie('hideZeroBalanceTokens', e);
                      }),
                      (n.setInitialGasEstimate = function (e) {
                        return async t => {
                          await (0, D.submitRequestToBackground)('setInitialGasEstimate', [e]),
                            await de(t);
                        };
                      }),
                      (n.setIpfsGateway = function (e) {
                        return t => {
                          r.default.debug('background.setIpfsGateway'),
                            (0, D.callBackgroundMethod)('setIpfsGateway', [e], e => {
                              e && t(se(e));
                            });
                        };
                      }),
                      (n.setIsIpfsGatewayEnabled = function (e) {
                        return t => {
                          r.default.debug('background.setIsIpfsGatewayEnabled'),
                            (0, D.callBackgroundMethod)('setIsIpfsGatewayEnabled', [e], e => {
                              e && t(se(e));
                            });
                        };
                      }),
                      (n.setLastActiveTime = function () {
                        return e => {
                          (0, D.callBackgroundMethod)('setLastActiveTime', [], t => {
                            t && e(se(t));
                          });
                        };
                      }),
                      (n.setLastInteractedConfirmationInfo = async function (e) {
                        return await (0, D.submitRequestToBackground)(
                          'setLastInteractedConfirmationInfo',
                          [e]
                        );
                      }),
                      (n.setLastViewedUserSurvey = function (e) {
                        return async () => {
                          await (0, D.submitRequestToBackground)('setLastViewedUserSurvey', [e]);
                        };
                      }),
                      (n.setManageInstitutionalWallets = function (e) {
                        return async t => {
                          t(ne()),
                            await (0, D.submitRequestToBackground)(
                              'setManageInstitutionalWallets',
                              [e]
                            ),
                            t(re());
                        };
                      }),
                      (n.setName = function (e) {
                        return async () => {
                          await (0, D.submitRequestToBackground)('setName', [e]);
                        };
                      }),
                      (n.setNetworkClientIdForDomain = function (e, t) {
                        return (0, D.submitRequestToBackground)('setNetworkClientIdForDomain', [
                          e,
                          t,
                        ]);
                      }),
                      (n.setNewNetworkAdded = function ({
                        networkConfigurationId: e,
                        nickname: t,
                      }) {
                        return {
                          type: v.SET_NEW_NETWORK_ADDED,
                          payload: { networkConfigurationId: e, nickname: t },
                        };
                      }),
                      (n.setNewNftAddedMessage = function (e) {
                        return { type: v.SET_NEW_NFT_ADDED_MESSAGE, payload: e };
                      }),
                      (n.setNewTokensImported = function (e) {
                        return { type: v.SET_NEW_TOKENS_IMPORTED, payload: e };
                      }),
                      (n.setNewTokensImportedError = function (e) {
                        return { type: v.SET_NEW_TOKENS_IMPORTED_ERROR, payload: e };
                      }),
                      (n.setNextNonce = me),
                      (n.setOpenMetamaskTabsIDs = Se),
                      (n.setOpenSeaEnabled = function (e) {
                        return async t => {
                          t(ne()), r.default.debug('background.setOpenSeaEnabled');
                          try {
                            await (0, D.submitRequestToBackground)('setOpenSeaEnabled', [e]);
                          } finally {
                            t(re());
                          }
                        };
                      }),
                      (n.setOutdatedBrowserWarningLastShown = function (e) {
                        return async () => {
                          await (0, D.submitRequestToBackground)(
                            'setOutdatedBrowserWarningLastShown',
                            [e]
                          );
                        };
                      }),
                      (n.setOverrideContentSecurityPolicyHeader = function (e) {
                        return async t => {
                          t(ne()),
                            await (0, D.submitRequestToBackground)(
                              'setOverrideContentSecurityPolicyHeader',
                              [e]
                            ),
                            t(re());
                        };
                      }),
                      (n.setParticipateInMetaMetrics = function (e) {
                        return t => (
                          r.default.debug('background.setParticipateInMetaMetrics'),
                          new Promise((n, a) => {
                            (0, D.callBackgroundMethod)(
                              'setParticipateInMetaMetrics',
                              [e],
                              (o, s) => {
                                if ((r.default.debug(o), o)) return t(se(o)), void a(o);
                                t({ type: v.SET_PARTICIPATE_IN_METAMETRICS, value: e }), n([e, s]);
                              }
                            );
                          })
                        );
                      }),
                      (n.setPendingTokens = function (e) {
                        const {
                            customToken: t,
                            selectedTokens: n = {},
                            tokenAddressList: a = [],
                          } = e,
                          r =
                            null != t &&
                            t.address &&
                            null != t &&
                            t.symbol &&
                            Boolean(
                              (null == t ? void 0 : t.decimals) >= 0 &&
                                (null == t ? void 0 : t.decimals) <= 36
                            )
                              ? { ...n, [t.address]: { ...t, isCustom: !0 } }
                              : n;
                        return (
                          Object.keys(r).forEach(e => {
                            const t = a.find(t => (0, N.isEqualCaseInsensitive)(t, e));
                            r[e] = { ...r[e], unlisted: !t };
                          }),
                          { type: v.SET_PENDING_TOKENS, payload: r }
                        );
                      }),
                      (n.setPreference = ie),
                      (n.setPrivacyMode = function (e) {
                        return ie('privacyMode', e, !1);
                      }),
                      (n.setRecoveryPhraseReminderHasBeenShown = function () {
                        return () => {
                          (0, D.callBackgroundMethod)(
                            'setRecoveryPhraseReminderHasBeenShown',
                            [],
                            e => {
                              if ((0, y.isErrorWithMessage)(e))
                                throw new Error((0, y.getErrorMessage)(e));
                            }
                          );
                        };
                      }),
                      (n.setRecoveryPhraseReminderLastShown = function (e) {
                        return () => {
                          (0, D.callBackgroundMethod)(
                            'setRecoveryPhraseReminderLastShown',
                            [e],
                            e => {
                              if ((0, y.isErrorWithMessage)(e))
                                throw new Error((0, y.getErrorMessage)(e));
                            }
                          );
                        };
                      }),
                      (n.setRemoveNftMessage = function (e) {
                        return { type: v.SET_REMOVE_NFT_MESSAGE, payload: e };
                      }),
                      (n.setRequestAccountTabIds = pe),
                      (n.setSecurityAlertsEnabled = function (e) {
                        try {
                          (0, D.submitRequestToBackground)('setSecurityAlertsEnabled', [e]);
                        } catch (e) {
                          (0, y.logErrorWithMessage)(e);
                        }
                      }),
                      (n.setSeedPhraseBackedUp = Te),
                      (n.setSelectedAccount = function (e) {
                        return async (t, n) => {
                          t(ne()), r.default.debug('background.setSelectedAccount');
                          const a = n(),
                            o = (0, E.getUnconnectedAccountAlertEnabledness)(a),
                            s = a.activeTab.origin,
                            i = (0, T.getSelectedInternalAccount)(a),
                            c = (0, T.getInternalAccountByAddress)(a, e),
                            u = (0, T.getAllPermittedAccountsForCurrentTab)(a),
                            d = (0, O.isInternalAccountInPermittedAccountIds)(i, u),
                            l = (0, O.isInternalAccountInPermittedAccountIds)(c, u),
                            g = Boolean(s) && d && !l;
                          try {
                            await z(c.id), await de(t);
                          } catch (e) {
                            return void t(se(e));
                          } finally {
                            t(re());
                          }
                          o && g && (t((0, S.switchedToUnconnectedAccount)()), await he(s));
                        };
                      }),
                      (n.setSelectedInternalAccount = function (e) {
                        return async t => {
                          t(ne()), r.default.debug('background.setSelectedInternalAccount');
                          try {
                            await z(e);
                          } catch (e) {
                            return void t(se(e));
                          } finally {
                            t(re());
                          }
                        };
                      }),
                      (n.setSelectedNetworkConfigurationId = function (e) {
                        return { type: v.SET_SELECTED_NETWORK_CONFIGURATION_ID, payload: e };
                      }),
                      (n.setSelectedQuoteAggId = function (e) {
                        return async t => {
                          await (0, D.submitRequestToBackground)('setSelectedQuoteAggId', [e]),
                            await de(t);
                        };
                      }),
                      (n.setServiceWorkerKeepAlivePreference = function (e) {
                        return async t => {
                          t(ne()),
                            r.default.debug('background.setServiceWorkerKeepAlivePreference');
                          try {
                            await (0, D.submitRequestToBackground)(
                              'setServiceWorkerKeepAlivePreference',
                              [e]
                            );
                          } catch (e) {
                            t(se(e));
                          } finally {
                            t(re());
                          }
                        };
                      }),
                      (n.setShowExtensionInFullSizeView = function (e) {
                        return ie('showExtensionInFullSizeView', e);
                      }),
                      (n.setShowFiatConversionOnTestnetsPreference = function (e) {
                        return ie('showFiatInTestnets', e);
                      }),
                      (n.setShowMultiRpcModal = function (e) {
                        return ie('showMultiRpcModal', e);
                      }),
                      (n.setShowNativeTokenAsMainBalancePreference = function (e) {
                        return ie('showNativeTokenAsMainBalance', e);
                      }),
                      (n.setShowTestNetworks = function (e) {
                        return ie('showTestNetworks', e);
                      }),
                      (n.setSlides = function (e) {
                        return { type: v.SET_SLIDES, slides: e };
                      }),
                      (n.setSmartTransactionsPreferenceEnabled = function (e) {
                        return async (t, n) => {
                          const a = (0, k.getSmartTransactionsOptInStatusInternal)(n());
                          _e({
                            category: _.MetaMetricsEventCategory.Settings,
                            event: _.MetaMetricsEventName.SettingsUpdated,
                            properties: { stx_opt_in: e, prev_stx_opt_in: a },
                          }),
                            await t(ie('smartTransactionsOptInStatus', e)),
                            await de(t);
                        };
                      }),
                      (n.setSmartTransactionsRefreshInterval = function (e) {
                        return async () => {
                          if (e !== undefined && null !== e)
                            try {
                              await (0, D.submitRequestToBackground)('setStatusRefreshInterval', [
                                e,
                              ]);
                            } catch (e) {
                              (0, y.logErrorWithMessage)(e);
                            }
                        };
                      }),
                      (n.setSnapsAddSnapAccountModalDismissed = async function () {
                        await (0, D.submitRequestToBackground)(
                          'setSnapsAddSnapAccountModalDismissed',
                          [!0]
                        );
                      }),
                      (n.setSnapsInstallPrivacyWarningShownStatus = function (e) {
                        return async () => {
                          await (0, D.submitRequestToBackground)(
                            'setSnapsInstallPrivacyWarningShownStatus',
                            [e]
                          );
                        };
                      }),
                      (n.setSwapsErrorKey = function (e) {
                        return async t => {
                          await (0, D.submitRequestToBackground)('setSwapsErrorKey', [e]),
                            await de(t);
                        };
                      }),
                      (n.setSwapsFeatureFlags = function (e) {
                        return async t => {
                          await (0, D.submitRequestToBackground)('setSwapsFeatureFlags', [e]),
                            await de(t);
                        };
                      }),
                      (n.setSwapsLiveness = function (e) {
                        return async t => {
                          await (0, D.submitRequestToBackground)('setSwapsLiveness', [e]),
                            await de(t);
                        };
                      }),
                      (n.setSwapsQuotesPollingLimitEnabled = function (e) {
                        return async t => {
                          await (0, D.submitRequestToBackground)(
                            'setSwapsQuotesPollingLimitEnabled',
                            [e]
                          ),
                            await de(t);
                        };
                      }),
                      (n.setSwapsTokens = function (e) {
                        return async t => {
                          await (0, D.submitRequestToBackground)('setSwapsTokens', [e]),
                            await de(t);
                        };
                      }),
                      (n.setSwapsTxGasLimit = function (e) {
                        return async t => {
                          await (0, D.submitRequestToBackground)('setSwapsTxGasLimit', [e, !0]),
                            await de(t);
                        };
                      }),
                      (n.setSwapsTxGasPrice = function (e) {
                        return async t => {
                          await (0, D.submitRequestToBackground)('setSwapsTxGasPrice', [e]),
                            await de(t);
                        };
                      }),
                      (n.setSwitchedNetworkDetails = Z),
                      (n.setTermsOfUseLastAgreed = function (e) {
                        return async () => {
                          await (0, D.submitRequestToBackground)('setTermsOfUseLastAgreed', [e]);
                        };
                      }),
                      (n.setTheme = function (e) {
                        return async t => {
                          t(ne()), r.default.debug('background.setTheme');
                          try {
                            await (0, D.submitRequestToBackground)('setTheme', [e]);
                          } finally {
                            t(re());
                          }
                        };
                      }),
                      (n.setTokenNetworkFilter = function (e) {
                        return ie('tokenNetworkFilter', e, !1);
                      }),
                      (n.setTokenSortConfig = function (e) {
                        return ie('tokenSortConfig', e, !1);
                      }),
                      (n.setTransactionActive = function (e, t) {
                        return async () => {
                          await (0, D.submitRequestToBackground)('setTransactionActive', [e, t]);
                        };
                      }),
                      (n.setUnconnectedAccountAlertShown = he),
                      (n.setUse4ByteResolution = function (e) {
                        return async t => {
                          t(ne()), r.default.debug('background.setUse4ByteResolution');
                          try {
                            await (0, D.submitRequestToBackground)('setUse4ByteResolution', [e]);
                          } catch (e) {
                            t(se(e));
                          } finally {
                            t(re());
                          }
                        };
                      }),
                      (n.setUseAddressBarEnsResolution = function (e) {
                        return t => {
                          r.default.debug('background.setUseAddressBarEnsResolution'),
                            (0, D.callBackgroundMethod)('setUseAddressBarEnsResolution', [e], e => {
                              e && t(se(e));
                            });
                        };
                      }),
                      (n.setUseBlockie = function (e) {
                        return t => {
                          t(ne()),
                            r.default.debug('background.setUseBlockie'),
                            (0, D.callBackgroundMethod)('setUseBlockie', [e], e => {
                              t(re()), e && t(se(e));
                            });
                        };
                      }),
                      (n.setUseCurrencyRateCheck = function (e) {
                        return t => {
                          t(ne()),
                            r.default.debug('background.setUseCurrencyRateCheck'),
                            (0, D.callBackgroundMethod)('setUseCurrencyRateCheck', [e], e => {
                              t(re()), e && t(se(e));
                            });
                        };
                      }),
                      (n.setUseExternalNameSources = function (e) {
                        try {
                          (0, D.submitRequestToBackground)('setUseExternalNameSources', [e]);
                        } catch (e) {
                          (0, y.logErrorWithMessage)(e);
                        }
                      }),
                      (n.setUseMultiAccountBalanceChecker = function (e) {
                        return t => {
                          t(ne()),
                            r.default.debug('background.setUseMultiAccountBalanceChecker'),
                            (0, D.callBackgroundMethod)(
                              'setUseMultiAccountBalanceChecker',
                              [e],
                              e => {
                                t(re()), e && t(se(e));
                              }
                            );
                        };
                      }),
                      (n.setUseNftDetection = function (e) {
                        return async t => {
                          t(ne()), r.default.debug('background.setUseNftDetection');
                          try {
                            await (0, D.submitRequestToBackground)('setUseNftDetection', [e]);
                          } finally {
                            t(re());
                          }
                        };
                      }),
                      (n.setUsePhishDetect = function (e) {
                        return t => {
                          t(ne()),
                            r.default.debug('background.setUsePhishDetect'),
                            (0, D.callBackgroundMethod)('setUsePhishDetect', [e], e => {
                              t(re()), e && t(se(e));
                            });
                        };
                      }),
                      (n.setUseSafeChainsListValidation = function (e) {
                        return t => {
                          t(ne()),
                            r.default.debug('background.setUseSafeChainsListValidation'),
                            (0, D.callBackgroundMethod)(
                              'setUseSafeChainsListValidation',
                              [e],
                              e => {
                                t(re()), e && t(se(e));
                              }
                            );
                        };
                      }),
                      (n.setUseTokenDetection = function (e) {
                        return t => {
                          t(ne()),
                            r.default.debug('background.setUseTokenDetection'),
                            (0, D.callBackgroundMethod)('setUseTokenDetection', [e], e => {
                              t(re()), e && t(se(e));
                            });
                        };
                      }),
                      (n.setUseTransactionSimulations = function (e) {
                        try {
                          (0, D.submitRequestToBackground)('setUseTransactionSimulations', [e]);
                        } catch (e) {
                          (0, y.logErrorWithMessage)(e);
                        }
                      }),
                      (n.setWatchEthereumAccountEnabled = async function (e) {
                        try {
                          await (0, D.submitRequestToBackground)('setWatchEthereumAccountEnabled', [
                            e,
                          ]);
                        } catch (e) {
                          (0, y.logErrorWithMessage)(e);
                        }
                      }),
                      (n.setWeb3ShimUsageAlertDismissed = async function (e) {
                        await (0, D.submitRequestToBackground)('setWeb3ShimUsageAlertDismissed', [
                          e,
                        ]);
                      }),
                      (n.showAccountsPage = Q),
                      (n.showAlert = function (e) {
                        return { type: v.ALERT_OPEN, payload: e };
                      }),
                      (n.showConfTxPage = X),
                      (n.showConfirmTurnOffProfileSyncing = function () {
                        return e => {
                          e(ee({ name: 'CONFIRM_TURN_OFF_PROFILE_SYNCING' }));
                        };
                      }),
                      (n.showConfirmTurnOnMetamaskNotifications = function () {
                        return e => {
                          e(ee({ name: 'TURN_ON_METAMASK_NOTIFICATIONS' }));
                        };
                      }),
                      (n.showDeprecatedNetworkModal = function () {
                        return { type: v.DEPRECATED_NETWORK_POPOVER_OPEN };
                      }),
                      (n.showImportNftsModal = function (e) {
                        return { type: v.IMPORT_NFTS_MODAL_OPEN, payload: e };
                      }),
                      (n.showImportTokensModal = function () {
                        return { type: v.IMPORT_TOKENS_POPOVER_OPEN };
                      }),
                      (n.showIpfsModal = function () {
                        return { type: v.SHOW_IPFS_MODAL_OPEN };
                      }),
                      (n.showKeyringSnapRemovalModal = function (e) {
                        return { type: v.SHOW_KEYRING_SNAP_REMOVAL_RESULT, payload: e };
                      }),
                      (n.showLoadingIndication = ne),
                      (n.showModal = ee),
                      (n.showNetworkDropdown = function () {
                        return { type: v.NETWORK_DROPDOWN_OPEN };
                      }),
                      (n.showNftStillFetchingIndication = ae),
                      (n.showPermittedNetworkToast = function () {
                        return { type: v.SHOW_PERMITTED_NETWORK_TOAST_OPEN };
                      }),
                      (n.showPrivateKey = function (e) {
                        return { type: v.SHOW_PRIVATE_KEY, payload: e };
                      }),
                      (n.showQrScanner = function () {
                        return e => {
                          e(ee({ name: 'QR_SCANNER' }));
                        };
                      }),
                      (n.showSendTokenPage = function () {
                        return { type: v.SHOW_SEND_TOKEN_PAGE };
                      }),
                      (n.signAndSendSmartTransaction = function ({
                        unsignedTransaction: e,
                        smartTransactionFees: t,
                      }) {
                        return async n => {
                          const a = await Ne(e, t.fees);
                          try {
                            return (
                              await (0, D.submitRequestToBackground)('submitSignedTransactions', [
                                {
                                  signedTransactions: a,
                                  signedCanceledTransactions: [],
                                  txParams: e,
                                },
                              ])
                            ).uuid;
                          } catch (e) {
                            if (((0, y.logErrorWithMessage)(e), (0, y.isErrorWithMessage)(e))) {
                              const t = (0, y.getErrorMessage)(e);
                              if (t.startsWith('Fetch error:')) {
                                const e = (0, h.parseSmartTransactionsError)(t);
                                n({ type: v.SET_SMART_TRANSACTIONS_ERROR, payload: e });
                              }
                            }
                            throw e;
                          }
                        };
                      }),
                      (n.stopPollingForQuotes = function () {
                        return async e => {
                          await (0, D.submitRequestToBackground)('stopPollingForQuotes'),
                            await de(e);
                        };
                      }),
                      (n.submitPassword = B),
                      (n.submitQRHardwareCryptoAccount = async function (e) {
                        await (0, D.submitRequestToBackground)('submitQRHardwareCryptoAccount', [
                          e,
                        ]);
                      }),
                      (n.submitQRHardwareCryptoHDKey = async function (e) {
                        await (0, D.submitRequestToBackground)('submitQRHardwareCryptoHDKey', [e]);
                      }),
                      (n.submitQRHardwareSignature = async function (e, t) {
                        await (0, D.submitRequestToBackground)('submitQRHardwareSignature', [e, t]);
                      }),
                      (n.syncInternalAccountsWithUserStorage = function () {
                        return async () => {
                          try {
                            return await (0, D.submitRequestToBackground)(
                              'syncInternalAccountsWithUserStorage'
                            );
                          } catch (e) {
                            throw ((0, y.logErrorWithMessage)(e), e);
                          }
                        };
                      }),
                      (n.throwTestBackgroundError = async function (e) {
                        await (0, D.submitRequestToBackground)('throwTestError', [e]);
                      }),
                      (n.toggleAccountMenu = function () {
                        return { type: v.TOGGLE_ACCOUNT_MENU };
                      }),
                      (n.toggleExternalServices = function (e) {
                        return async t => {
                          r.default.debug('background.toggleExternalServices');
                          try {
                            await (0, D.submitRequestToBackground)('toggleExternalServices', [e]),
                              await de(t);
                          } catch (e) {
                            t(se(e));
                          }
                        };
                      }),
                      (n.toggleNetworkMenu = function (e) {
                        return { type: v.TOGGLE_NETWORK_MENU, payload: e };
                      }),
                      (n.tokenBalancesStartPolling = async function (e) {
                        const t = await (0, D.submitRequestToBackground)(
                          'tokenBalancesStartPolling',
                          [{ chainId: e }]
                        );
                        return await Ee(t), t;
                      }),
                      (n.tokenBalancesStopPollingByPollingToken = async function (e) {
                        await (0, D.submitRequestToBackground)(
                          'tokenBalancesStopPollingByPollingToken',
                          [e]
                        ),
                          await fe(e);
                      }),
                      (n.tokenDetectionStartPolling = async function (e) {
                        const t = await (0, D.submitRequestToBackground)(
                          'tokenDetectionStartPolling',
                          [{ chainIds: e }]
                        );
                        return await Ee(t), t;
                      }),
                      (n.tokenDetectionStopPollingByPollingToken = async function (e) {
                        await (0, D.submitRequestToBackground)(
                          'tokenDetectionStopPollingByPollingToken',
                          [e]
                        ),
                          await fe(e);
                      }),
                      (n.tokenListStartPolling = async function (e) {
                        const t = await (0, D.submitRequestToBackground)('tokenListStartPolling', [
                          { chainId: e },
                        ]);
                        return await Ee(t), t;
                      }),
                      (n.tokenListStopPollingByPollingToken = async function (e) {
                        await (0, D.submitRequestToBackground)(
                          'tokenListStopPollingByPollingToken',
                          [e]
                        ),
                          await fe(e);
                      }),
                      (n.tokenRatesStartPolling = async function (e) {
                        const t = await (0, D.submitRequestToBackground)('tokenRatesStartPolling', [
                          { chainId: e },
                        ]);
                        return await Ee(t), t;
                      }),
                      (n.tokenRatesStopPollingByPollingToken = async function (e) {
                        await (0, D.submitRequestToBackground)(
                          'tokenRatesStopPollingByPollingToken',
                          [e]
                        ),
                          await fe(e);
                      }),
                      (n.trackInsightSnapUsage = function (e) {
                        return async () => {
                          await (0, D.submitRequestToBackground)('trackInsightSnapView', [e]);
                        };
                      }),
                      (n.trackMetaMetricsEvent = _e),
                      (n.trackMetaMetricsPage = function (e, t) {
                        return (0, D.submitRequestToBackground)('trackMetaMetricsPage', [
                          { ...e, actionId: (0, D.generateActionId)() },
                          t,
                        ]);
                      }),
                      (n.tryReverseResolveAddress = function (e) {
                        return () =>
                          new Promise(t => {
                            (0, D.callBackgroundMethod)('tryReverseResolveAddress', [e], e => {
                              e && (0, y.logErrorWithMessage)(e), t();
                            });
                          });
                      }),
                      (n.tryUnlockMetamask = function (e) {
                        return t => (
                          t(ne()),
                          t(x()),
                          r.default.debug('background.submitPassword'),
                          new Promise((t, n) => {
                            (0, D.callBackgroundMethod)('submitPassword', [e], e => {
                              e ? n(e) : t();
                            });
                          })
                            .then(() => (t(V()), de(t)))
                            .then(() => {
                              t(re());
                            })
                            .catch(
                              e => (t(j((0, y.getErrorMessage)(e))), t(re()), Promise.reject(e))
                            )
                        );
                      }),
                      (n.unMarkPasswordForgotten = K),
                      (n.unlockAndGetSeedPhrase = function (e) {
                        return async t => {
                          t(ne());
                          try {
                            await B(e);
                            const n = await q(e);
                            return await de(t), n;
                          } catch (e) {
                            throw (
                              (t(se(e)),
                              (0, y.isErrorWithMessage)(e)
                                ? new Error((0, y.getErrorMessage)(e))
                                : e)
                            );
                          } finally {
                            t(re());
                          }
                        };
                      }),
                      (n.unlockFailed = j),
                      (n.unlockHardwareWalletAccounts = function (e, t, n, a) {
                        return (
                          r.default.debug('background.unlockHardwareWalletAccount', e, t, n, a),
                          async r => {
                            r(ne());
                            for (const o of e)
                              try {
                                await (0, D.submitRequestToBackground)(
                                  'unlockHardwareWalletAccount',
                                  [o, t, n, a]
                                );
                              } catch (e) {
                                throw ((0, y.logErrorWithMessage)(e), r(se(e)), r(re()), e);
                              }
                            return r(re()), undefined;
                          }
                        );
                      }),
                      (n.unlockInProgress = x),
                      (n.unlockSucceeded = V),
                      (n.updateAccountsList = function (e) {
                        return async () => {
                          await (0, D.submitRequestToBackground)('updateAccountsList', [e]);
                        };
                      }),
                      (n.updateAndApproveTx = function (e, t, n) {
                        return (a, r) => {
                          !t && a(ne(n));
                          const o = () => Boolean(r().send.stage !== p.SEND_STAGES.INACTIVE);
                          return new Promise((t, n) => {
                            const r = (0, D.generateActionId)();
                            (0, D.callBackgroundMethod)(
                              'resolvePendingApproval',
                              [String(e.id), { txMeta: e, actionId: r }, { waitForResult: !0 }],
                              r => {
                                if ((a(W(e.id, e.txParams)), o() || a((0, p.resetSendState)()), r))
                                  return a(b()), (0, y.logErrorWithMessage)(r), void n(r);
                                t(e);
                              }
                            );
                          })
                            .then(() => de(a))
                            .then(
                              () => (
                                o() || a((0, p.resetSendState)()),
                                a(H(e.id)),
                                a(re()),
                                a(F('')),
                                a(te()),
                                e
                              )
                            )
                            .catch(e => (a(re()), Promise.reject(e)));
                        };
                      }),
                      (n.updateCurrentLocale = le),
                      (n.updateCustomNonce = F),
                      (n.updateCustomSwapsEIP1559GasParams = function ({
                        gasLimit: e,
                        maxFeePerGas: t,
                        maxPriorityFeePerGas: n,
                      }) {
                        return async a => {
                          await Promise.all([
                            (0, D.submitRequestToBackground)('setSwapsTxGasLimit', [e]),
                            (0, D.submitRequestToBackground)('setSwapsTxMaxFeePerGas', [t]),
                            (0, D.submitRequestToBackground)('setSwapsTxMaxFeePriorityPerGas', [n]),
                          ]),
                            await de(a);
                        };
                      }),
                      (n.updateDataDeletionTaskStatus = async function () {
                        return await (0, D.submitRequestToBackground)(
                          'updateDataDeletionTaskStatus'
                        );
                      }),
                      (n.updateEditableParams = function (e, t) {
                        return async n => {
                          let a;
                          try {
                            a = await (0, D.submitRequestToBackground)('updateEditableParams', [
                              e,
                              t,
                            ]);
                          } catch (e) {
                            throw ((0, y.logErrorWithMessage)(e), e);
                          }
                          return await de(n), a;
                        };
                      }),
                      (n.updateEventFragment = function (e, t) {
                        return (0, D.submitRequestToBackground)('updateEventFragment', [e, t]);
                      }),
                      (n.updateHiddenAccountsList = function (e) {
                        return async () => {
                          await (0, D.submitRequestToBackground)('updateHiddenAccountsList', [e]);
                        };
                      }),
                      (n.updateInterfaceState = function (e, t) {
                        return async n => {
                          await (0, D.submitRequestToBackground)('updateInterfaceState', [e, t]),
                            await de(n);
                        };
                      }),
                      (n.updateMetamaskState = Y),
                      (n.updateNetwork = function (e, t = {}) {
                        return async n => {
                          r.default.debug('background.updateNetwork', e);
                          try {
                            return await (0, D.submitRequestToBackground)('updateNetwork', [
                              e.chainId,
                              e,
                              t,
                            ]);
                          } catch (e) {
                            (0, y.logErrorWithMessage)(e),
                              n(se('Had a problem updading networks!'));
                          }
                          return undefined;
                        };
                      }),
                      (n.updateNetworksList = function (e) {
                        return async () => {
                          await (0, D.submitRequestToBackground)('updateNetworksList', [e]);
                        };
                      }),
                      (n.updateNftDropDownState = function (e) {
                        return async t => {
                          await (0, D.submitRequestToBackground)('updateNftDropDownState', [e]),
                            await de(t);
                        };
                      }),
                      (n.updateOnChainTriggersByAccount = function (e) {
                        return async () => {
                          try {
                            await (0, D.submitRequestToBackground)(
                              'updateOnChainTriggersByAccount',
                              [e]
                            );
                          } catch (e) {
                            throw ((0, y.logErrorWithMessage)(e), e);
                          }
                        };
                      }),
                      (n.updatePreviousGasParams = function (e, t) {
                        return async () => {
                          let n;
                          try {
                            n = await (0, D.submitRequestToBackground)('updatePreviousGasParams', [
                              e,
                              t,
                            ]);
                          } catch (e) {
                            throw ((0, y.logErrorWithMessage)(e), e);
                          }
                          return n;
                        };
                      }),
                      (n.updateProposedNames = function (e) {
                        return async () =>
                          await (0, D.submitRequestToBackground)('updateProposedNames', [e]);
                      }),
                      (n.updateSlides = function (e) {
                        return async () => {
                          try {
                            await (0, D.submitRequestToBackground)('updateSlides', [e]);
                          } catch (e) {
                            throw ((0, y.logErrorWithMessage)(e), e);
                          }
                        };
                      }),
                      (n.updateSmartTransaction = function (e, t) {
                        return async n => {
                          try {
                            await (0, D.submitRequestToBackground)('updateSmartTransaction', [
                              { uuid: e, ...t },
                            ]);
                          } catch (e) {
                            if (((0, y.logErrorWithMessage)(e), (0, y.isErrorWithMessage)(e))) {
                              const t = (0, y.getErrorMessage)(e);
                              if (t.startsWith('Fetch error:')) {
                                const e = (0, h.parseSmartTransactionsError)(t);
                                n({ type: v.SET_SMART_TRANSACTIONS_ERROR, payload: e });
                              }
                            }
                            throw e;
                          }
                        };
                      }),
                      (n.updateSnap = function (e, t) {
                        return async (n, a) => {
                          await (0, D.submitRequestToBackground)('updateSnap', [e, t]), await de(n);
                          const r = a(),
                            o = (0, T.getFirstSnapInstallOrUpdateRequest)(r);
                          return null == o ? void 0 : o.metadata.id;
                        };
                      }),
                      (n.updateSwapsUserFeeLevel = function (e) {
                        return async t => {
                          await (0, D.submitRequestToBackground)('setSwapsUserFeeLevel', [e]),
                            await de(t);
                        };
                      }),
                      (n.updateThrottledOriginState = function (e, t) {
                        return async () => {
                          await (0, D.submitRequestToBackground)('updateThrottledOriginState', [
                            e,
                            t,
                          ]);
                        };
                      }),
                      (n.updateTokenType = async function (e) {
                        try {
                          return await (0, D.submitRequestToBackground)('updateTokenType', [e]);
                        } catch (e) {
                          (0, y.logErrorWithMessage)(e);
                        }
                        return undefined;
                      }),
                      (n.updateTransaction = function (e, t) {
                        return async n => {
                          !t && n(ne());
                          try {
                            await (0, D.submitRequestToBackground)('updateTransaction', [e]);
                          } catch (t) {
                            throw (
                              (n(W(e.id, e.txParams)),
                              n(re()),
                              n(b()),
                              (0, y.logErrorWithMessage)(t),
                              t)
                            );
                          }
                          try {
                            return n(W(e.id, e.txParams)), await de(n), n(X({ id: e.id })), e;
                          } finally {
                            n(re());
                          }
                        };
                      }),
                      (n.updateTransactionGasFees = function (e, t) {
                        return async () => {
                          let n;
                          try {
                            n = await (0, D.submitRequestToBackground)('updateTransactionGasFees', [
                              e,
                              t,
                            ]);
                          } catch (e) {
                            throw ((0, y.logErrorWithMessage)(e), e);
                          }
                          return n;
                        };
                      }),
                      (n.updateTransactionParams = W),
                      (n.updateTransactionSendFlowHistory = function (e, t, n) {
                        return async () => {
                          let a;
                          try {
                            a = await (0, D.submitRequestToBackground)(
                              'updateTransactionSendFlowHistory',
                              [e, t, n]
                            );
                          } catch (e) {
                            throw ((0, y.logErrorWithMessage)(e), e);
                          }
                          return a;
                        };
                      }),
                      (n.updateViewedNotifications = function (e) {
                        return (0, D.submitRequestToBackground)('updateViewedNotifications', [e]);
                      }),
                      (n.verifyPassword = U);
                    var a = M(e('webextension-polyfill')),
                      r = M(e('loglevel')),
                      o = e('@sentry/browser'),
                      s = e('lodash'),
                      i = e('@metamask/rpc-errors'),
                      c = e('@metamask/profile-sync-controller/sdk'),
                      u = e('@metamask/snaps-utils'),
                      d = M(e('../../shared/lib/switch-direction')),
                      l = e('../../shared/constants/app'),
                      g = e('../../app/scripts/lib/util'),
                      T = e('../selectors'),
                      m = e('../../shared/modules/selectors/networks'),
                      p = e('../ducks/send'),
                      S = e('../ducks/alerts/unconnected-account'),
                      E = e('../ducks/metamask/metamask'),
                      f = e('../../shared/modules/hexstring-utils'),
                      A = e('../../shared/constants/hardware-wallets'),
                      _ = e('../../shared/constants/metametrics'),
                      h = e('../pages/swaps/swaps.util'),
                      N = e('../../shared/modules/string-utils'),
                      k = e('../../shared/modules/selectors'),
                      I = e('../../shared/modules/i18n'),
                      C = e('../../shared/modules/conversion.utils'),
                      y = e('../../shared/modules/error'),
                      w = e('../../shared/lib/four-byte'),
                      O = e(
                        '../../shared/lib/multichain/chain-agnostic-permission-utils/caip-accounts'
                      ),
                      R = e('../helpers/constants/notifications'),
                      v = (function (e, t) {
                        if (!t && e && e.__esModule) return e;
                        if (null === e || ('object' != typeof e && 'function' != typeof e))
                          return { default: e };
                        var n = P(t);
                        if (n && n.has(e)) return n.get(e);
                        var a = { __proto__: null },
                          r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                        for (var o in e)
                          if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                            var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                            s && (s.get || s.set) ? Object.defineProperty(a, o, s) : (a[o] = e[o]);
                          }
                        return (a.default = e), n && n.set(e, a), a;
                      })(e('./actionConstants')),
                      D = e('./background-connection');
                    function P(e) {
                      if ('function' != typeof WeakMap) return null;
                      var t = new WeakMap(),
                        n = new WeakMap();
                      return (P = function (e) {
                        return e ? n : t;
                      })(e);
                    }
                    function M(e) {
                      return e && e.__esModule ? e : { default: e };
                    }
                    function b() {
                      return { type: v.GO_HOME };
                    }
                    function B(e) {
                      return new Promise((t, n) => {
                        (0, D.callBackgroundMethod)('submitPassword', [e], e => {
                          e ? n(e) : t();
                        });
                      });
                    }
                    function L(e) {
                      return new Promise((t, n) => {
                        (0, D.callBackgroundMethod)('createNewVaultAndKeychain', [e], e => {
                          e ? n(e) : t(!0);
                        });
                      });
                    }
                    function U(e) {
                      return new Promise((t, n) => {
                        (0, D.callBackgroundMethod)('verifyPassword', [e], e => {
                          e ? n(e) : t(!0);
                        });
                      });
                    }
                    async function q(e, n) {
                      const a = await (0, D.submitRequestToBackground)('getSeedPhrase', [e, n]);
                      return t.from(a).toString('utf8');
                    }
                    function F(e) {
                      return { type: v.UPDATE_CUSTOM_NONCE, value: e };
                    }
                    function H(e) {
                      return t => {
                        t({ type: v.COMPLETED_TX, value: { id: e } });
                      };
                    }
                    function W(e, t) {
                      return { type: v.UPDATE_TRANSACTION_PARAMS, id: e, value: t };
                    }
                    async function G(e) {
                      return (0, D.submitRequestToBackground)('handleSnapRequest', [e]);
                    }
                    function K() {
                      return e =>
                        new Promise(e => {
                          (0, D.callBackgroundMethod)('unMarkPasswordForgotten', [], () => {
                            e();
                          });
                        }).then(() => de(e));
                    }
                    function x() {
                      return { type: v.UNLOCK_IN_PROGRESS };
                    }
                    function j(e) {
                      return { type: v.UNLOCK_FAILED, value: e };
                    }
                    function V(e) {
                      return { type: v.UNLOCK_SUCCEEDED, value: e };
                    }
                    function Y(e) {
                      return (t, n) => {
                        var a, r;
                        const o = n(),
                          i = (0, m.getProviderConfig)(o),
                          { metamask: c } = o;
                        if (null == e || !e.length) return c;
                        const u = (function (e, t) {
                            const n = { ...e };
                            for (const e of t) {
                              const { op: t, path: a, value: r } = e;
                              if ('replace' !== t)
                                throw new Error(`Unsupported patch operation: ${t}`);
                              n[a[0]] = r;
                            }
                            return n;
                          })(c, e),
                          { currentLocale: d } = c,
                          l = (0, T.getSelectedInternalAccount)(o),
                          g = null == l ? void 0 : l.address,
                          { currentLocale: S } = u,
                          E = (0, m.getProviderConfig)({ metamask: u }),
                          f = (0, T.getSelectedInternalAccount)({ metamask: u }),
                          A = null == f ? void 0 : f.address;
                        d && S && d !== S && t(le(S)),
                          g !== A && t({ type: v.SELECTED_ADDRESS_CHANGED });
                        const _ =
                            (null === (a = u.addressBook) || void 0 === a
                              ? void 0
                              : a[null == E ? void 0 : E.chainId]) ?? {},
                          h =
                            (null === (r = c.addressBook) || void 0 === r
                              ? void 0
                              : r[null == i ? void 0 : i.chainId]) ?? {},
                          N = (0, T.getMetaMaskAccounts)({ metamask: u }),
                          k = (0, T.getMetaMaskAccounts)({ metamask: c }),
                          I = N[A],
                          C = N[g];
                        return (
                          Object.entries(k).forEach(([e, n]) => {
                            (0, s.isEqual)(n, N[e]) ||
                              t({ type: v.ACCOUNT_CHANGED, payload: { account: N[e] } });
                          }),
                          !1 === (0, s.isEqual)(C, I) &&
                            t({ type: v.SELECTED_ACCOUNT_CHANGED, payload: { account: I } }),
                          !1 === (0, s.isEqual)(h, _) &&
                            t({ type: v.ADDRESS_BOOK_UPDATED, payload: { addressBook: _ } }),
                          !1 === (0, s.isEqual)(c.gasFeeEstimates, u.gasFeeEstimates) &&
                            t({
                              type: v.GAS_FEE_ESTIMATES_UPDATED,
                              payload: {
                                gasFeeEstimates: u.gasFeeEstimates,
                                gasEstimateType: u.gasEstimateType,
                              },
                            }),
                          t({ type: v.UPDATE_METAMASK_STATE, value: u }),
                          i.chainId !== E.chainId &&
                            (t({ type: v.CHAIN_CHANGED, payload: E.chainId }),
                            t((0, p.initializeSendState)({ chainHasChanged: !0 }))),
                          u
                        );
                      };
                    }
                    const $ = () =>
                      new Promise((e, t) => {
                        (0, D.callBackgroundMethod)('setLocked', [], n => {
                          n ? t(n) : e();
                        });
                      });
                    async function z(e) {
                      r.default.debug('background.setSelectedInternalAccount'),
                        await (0, D.submitRequestToBackground)('setSelectedInternalAccount', [e]);
                    }
                    function Q() {
                      return { type: v.SHOW_ACCOUNTS_PAGE };
                    }
                    function X({ id: e } = {}) {
                      return { type: v.SHOW_CONF_TX_PAGE, id: e };
                    }
                    function Z(e) {
                      return async t => {
                        await (0, D.submitRequestToBackground)('setSwitchedNetworkDetails', [e]),
                          await de(t);
                      };
                    }
                    function J(e) {
                      return async () => {
                        r.default.debug(`background.setActiveNetworkConfigurationId: ${e}`);
                        try {
                          await (0, D.submitRequestToBackground)(
                            'setActiveNetworkConfigurationId',
                            [e]
                          );
                        } catch (e) {
                          (0, y.logErrorWithMessage)(e);
                        }
                      };
                    }
                    function ee(e) {
                      return { type: v.MODAL_OPEN, payload: e };
                    }
                    function te() {
                      return (e, t) => {
                        const n = t(),
                          a = (0, T.getApprovalFlows)(n);
                        (0, g.getEnvironmentType)() !== l.ENVIRONMENT_TYPE_NOTIFICATION ||
                          (0, T.hasTransactionPendingApprovals)(n) ||
                          (0, T.getIsSigningQRHardwareTransaction)(n) ||
                          0 !== a.length ||
                          Ae();
                      };
                    }
                    function ne(e) {
                      return { type: v.SHOW_LOADING, payload: e };
                    }
                    function ae() {
                      return { type: v.SHOW_NFT_STILL_FETCHING_INDICATION };
                    }
                    function re() {
                      return { type: v.HIDE_LOADING };
                    }
                    function oe() {
                      return { type: v.HIDE_NFT_STILL_FETCHING_INDICATION };
                    }
                    function se(e) {
                      var t;
                      return (0, y.isErrorWithMessage)(e)
                        ? {
                            type: v.DISPLAY_WARNING,
                            payload:
                              (null == e || null === (t = e.cause) || void 0 === t
                                ? void 0
                                : t.message) || e.message,
                          }
                        : 'string' == typeof e
                          ? { type: v.DISPLAY_WARNING, payload: e }
                          : { type: v.DISPLAY_WARNING, payload: `${e}` };
                    }
                    function ie(e, t, n = !0) {
                      return a => (
                        n && a(ne()),
                        new Promise((r, o) => {
                          (0, D.callBackgroundMethod)('setPreference', [e, t], (e, t) => {
                            if ((n && a(re()), e)) return a(se(e)), void o(e);
                            r(t);
                          });
                        })
                      );
                    }
                    function ce() {
                      return { type: v.COMPLETE_ONBOARDING };
                    }
                    function ue() {
                      return { type: v.RESET_ONBOARDING };
                    }
                    async function de(e) {
                      let t;
                      try {
                        t = await (0, D.submitRequestToBackground)('getStatePatches');
                      } catch (t) {
                        throw (e(se(t)), t);
                      }
                      return e(Y(t));
                    }
                    function le(e) {
                      return async t => {
                        t(ne());
                        try {
                          await (0, I.loadRelativeTimeFormatLocaleData)(e);
                          const n = await (0, I.fetchLocale)(e),
                            a = await (0, D.submitRequestToBackground)('setCurrentLocale', [e]);
                          (0, d.default)(a), t(ge(e, n));
                        } catch (e) {
                          return void t(se(e));
                        } finally {
                          t(re());
                        }
                      };
                    }
                    function ge(e, t) {
                      return { type: v.SET_CURRENT_LOCALE, payload: { locale: e, messages: t } };
                    }
                    function Te(e) {
                      return t => (
                        r.default.debug('background.setSeedPhraseBackedUp'),
                        new Promise((n, a) => {
                          (0, D.callBackgroundMethod)('setSeedPhraseBackedUp', [e], e => {
                            if (e) return t(se(e)), void a(e);
                            de(t).then(n).catch(a);
                          });
                        })
                      );
                    }
                    function me(e) {
                      return { type: v.SET_NEXT_NONCE, payload: e };
                    }
                    function pe(e) {
                      return { type: v.SET_REQUEST_ACCOUNT_TABS, payload: e };
                    }
                    function Se(e) {
                      return { type: v.SET_OPEN_METAMASK_TAB_IDS, payload: e };
                    }
                    async function Ee(e) {
                      return (0, D.submitRequestToBackground)('addPollingTokenToAppState', [
                        e,
                        l.POLLING_TOKEN_ENVIRONMENT_TYPES[(0, g.getEnvironmentType)()],
                      ]);
                    }
                    async function fe(e) {
                      return (0, D.submitRequestToBackground)('removePollingTokenFromAppState', [
                        e,
                        l.POLLING_TOKEN_ENVIRONMENT_TYPES[(0, g.getEnvironmentType)()],
                      ]);
                    }
                    async function Ae() {
                      try {
                        const e = await a.default.windows.getCurrent();
                        if (e.type && 'popup' !== e.type)
                          return void console.warn(
                            `Not safe to close a window that is not a popup: It is of type: ${e.type}`
                          );
                      } catch (e) {
                        console.warn(
                          'attemptCloseNotificationPopup: Error encountered while checking window type',
                          e
                        );
                      }
                      await (0, D.submitRequestToBackground)(
                        'markNotificationPopupAsAutomaticallyClosed'
                      ),
                        window.close();
                      try {
                        const e = await a.default.tabs.getCurrent();
                        await a.default.tabs.remove(e.id);
                      } catch (e) {
                        console.error('attemptCloseNotificationPopup: Failed to close tab', e);
                      }
                    }
                    function _e(e, t) {
                      return (0, D.submitRequestToBackground)('trackMetaMetricsEvent', [
                        { ...e, actionId: (0, D.generateActionId)() },
                        t,
                      ]);
                    }
                    async function he(e) {
                      await (0, D.submitRequestToBackground)('setUnconnectedAccountAlertShown', [
                        e,
                      ]);
                    }
                    const Ne = async (e, t, n) => {
                      const a = t.map(t => {
                        const a = {
                          ...e,
                          maxFeePerGas: (0, C.decimalToHex)(t.maxFeePerGas),
                          maxPriorityFeePerGas: (0, C.decimalToHex)(t.maxPriorityFeePerGas),
                          gas: n ? (0, C.decimalToHex)(21e3) : e.gas,
                          value: e.value,
                        };
                        return n && ((a.to = a.from), (a.data = '0x')), a;
                      });
                      return await (0, D.submitRequestToBackground)(
                        'approveTransactionsWithSameNonce',
                        [a]
                      );
                    };
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      { package: '$root$', file: 'ui/store/actions.ts' },
    ],
    [
      7620,
      { pify: 5070 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.generateActionId = n.callBackgroundMethod = void 0),
                  (n.setBackgroundConnection = async function (e) {
                    (o = e), (s = (0, r.default)(o));
                  }),
                  (n.submitRequestToBackground = function (e, t) {
                    var n;
                    return null === (n = s) || void 0 === n ? void 0 : n[e](...(t ?? []));
                  });
                var a,
                  r = (a = e('pify')) && a.__esModule ? a : { default: a };
                let o = null,
                  s = null;
                n.generateActionId = () => Date.now() + Math.random();
                n.callBackgroundMethod = (e, t, n) => {
                  var a;
                  null === (a = o) || void 0 === a || a[e](...t, n);
                };
              };
            };
      },
      { package: '$root$', file: 'ui/store/background-connection.ts' },
    ],
    [
      8,
      { '../../../shared/modules/object.utils': 5869 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.SENTRY_UI_STATE =
                    n.SENTRY_BACKGROUND_STATE =
                    n.MMI_SENTRY_BACKGROUND_STATE =
                      void 0);
                var a = e('../../../shared/modules/object.utils');
                n.MMI_SENTRY_BACKGROUND_STATE = {
                  MMIController: { opts: !0 },
                  CustodyController: { store: !0 },
                  MmiConfigurationController: { store: !0, configurationClient: !0 },
                };
                const r = (n.SENTRY_BACKGROUND_STATE = {
                    AccountsController: { internalAccounts: { accounts: !1, selectedAccount: !1 } },
                    AccountTracker: {
                      accounts: !1,
                      accountsByChainId: !1,
                      currentBlockGasLimit: !0,
                      currentBlockGasLimitByChainId: !0,
                    },
                    AddressBookController: { addressBook: !1 },
                    AlertController: {
                      alertEnabledness: !0,
                      unconnectedAccountAlertShownOrigins: !1,
                      web3ShimUsageOrigins: !1,
                    },
                    AnnouncementController: { announcements: !1 },
                    AuthenticationController: {
                      isSignedIn: !1,
                      sessionData: {
                        token: { accessToken: !1, expiresIn: !0, obtainedAt: !0 },
                        profile: !0,
                      },
                    },
                    NetworkOrderController: { orderedNetworkList: [] },
                    AccountOrderController: { pinnedAccountList: [], hiddenAccountList: [] },
                    AppMetadataController: {
                      currentAppVersion: !0,
                      currentMigrationVersion: !0,
                      previousAppVersion: !0,
                      previousMigrationVersion: !0,
                    },
                    ApprovalController: {
                      approvalFlows: !1,
                      pendingApprovals: !1,
                      pendingApprovalCount: !1,
                    },
                    AppStateController: {
                      browserEnvironment: !0,
                      connectedStatusPopoverHasBeenShown: !0,
                      currentPopupId: !1,
                      onboardingDate: !1,
                      currentExtensionPopupId: !1,
                      defaultHomeActiveTabName: !0,
                      fullScreenGasPollTokens: !0,
                      hadAdvancedGasFeesSetPriorToMigration92_3: !0,
                      isRampCardClosed: !0,
                      nftsDetectionNoticeDismissed: !0,
                      nftsDropdownState: !0,
                      notificationGasPollTokens: !0,
                      outdatedBrowserWarningLastShown: !0,
                      popupGasPollTokens: !0,
                      qrHardware: !0,
                      recoveryPhraseReminderHasBeenShown: !0,
                      recoveryPhraseReminderLastShown: !0,
                      showBetaHeader: !0,
                      showPermissionsTour: !0,
                      showNetworkBanner: !0,
                      showAccountBanner: !0,
                      switchedNetworkDetails: !1,
                      switchedNetworkNeverShowMessage: !1,
                      showTestnetMessageInDropdown: !0,
                      surveyLinkLastClickedOrClosed: !0,
                      snapsInstallPrivacyWarningShown: !0,
                      termsOfUseLastAgreed: !0,
                      throttledOrigins: !1,
                      timeoutMinutes: !0,
                      trezorModel: !0,
                    },
                    MultichainBalancesController: { balances: !1 },
                    MultichainAssetsController: { accountsAssets: !1, assetsMetadata: !1 },
                    MultichainAssetsRatesController: { assetsRates: !1 },
                    BridgeController: {
                      bridgeFeatureFlags: {
                        extensionConfig: { support: !1, chains: {} },
                        mobileConfig: !1,
                      },
                      quoteRequest: {
                        walletAddress: !1,
                        srcTokenAddress: !0,
                        slippage: !0,
                        srcChainId: !0,
                        destChainId: !0,
                        destTokenAddress: !0,
                        srcTokenAmount: !0,
                      },
                      quotes: [],
                      quotesInitialLoadTime: !0,
                      quotesLastFetched: !0,
                      quotesLoadingStatus: !0,
                      quoteFetchError: !0,
                      quotesRefreshCount: !0,
                    },
                    BridgeStatusController: { bridgeStatusState: { txHistory: !1 } },
                    CronjobController: { jobs: !1 },
                    CurrencyController: { currentCurrency: !0, currencyRates: !0 },
                    DecryptMessageController: {
                      unapprovedDecryptMsgs: !1,
                      unapprovedDecryptMsgCount: !0,
                    },
                    EncryptionPublicKeyController: {
                      unapprovedEncryptionPublicKeyMsgs: !1,
                      unapprovedEncryptionPublicKeyMsgCount: !0,
                    },
                    EnsController: { ensResolutionsByAddress: !1, ensEntries: !1 },
                    GasFeeController: {
                      estimatedGasFeeTimeBounds: !0,
                      gasEstimateType: !0,
                      gasFeeEstimates: !0,
                      gasFeeEstimatesByChainId: !0,
                      nonRPCGasFeeApisDisabled: !1,
                    },
                    KeyringController: { isUnlocked: !0, keyrings: !1 },
                    LoggingController: { logs: !1 },
                    NotificationServicesController: {
                      subscriptionAccountsSeen: !1,
                      isMetamaskNotificationsFeatureSeen: !1,
                      isNotificationServicesEnabled: !1,
                      isFeatureAnnouncementsEnabled: !1,
                      metamaskNotificationsList: !1,
                      metamaskNotificationsReadList: !1,
                      isCheckingAccountsPresence: !1,
                      isFetchingMetamaskNotifications: !1,
                      isUpdatingMetamaskNotifications: !1,
                      isUpdatingMetamaskNotificationsAccount: !1,
                    },
                    MetaMetricsController: {
                      eventsBeforeMetricsOptIn: !1,
                      fragments: !1,
                      metaMetricsId: !0,
                      participateInMetaMetrics: !0,
                      segmentApiCalls: !1,
                      traits: !1,
                      dataCollectionForMarketing: !1,
                      marketingCampaignCookieId: !0,
                      latestNonAnonymousEventTimestamp: !0,
                    },
                    MetaMetricsDataDeletionController: {
                      metaMetricsDataDeletionId: !0,
                      metaMetricsDataDeletionTimestamp: !0,
                    },
                    NameController: { names: !1, nameSources: !1, useExternalNameSources: !1 },
                    NetworkController: {
                      networkConfigurations: !1,
                      networksMetadata: !0,
                      selectedNetworkClientId: !1,
                    },
                    NftController: { allNftContracts: !1, allNfts: !1, ignoredNfts: !1 },
                    OnboardingController: {
                      completedOnboarding: !0,
                      firstTimeFlowType: !0,
                      onboardingTabs: !1,
                      seedPhraseBackedUp: !0,
                    },
                    PPOMController: {
                      securityAlertsEnabled: !1,
                      storageMetadata: [],
                      versionInfo: [],
                    },
                    PermissionController: { subjects: !1 },
                    PermissionLogController: { permissionActivityLog: !1, permissionHistory: !1 },
                    PhishingController: {},
                    PreferencesController: {
                      advancedGasFee: !0,
                      currentLocale: !0,
                      dismissSeedBackUpReminder: !0,
                      overrideContentSecurityPolicyHeader: !0,
                      featureFlags: !0,
                      forgottenPassword: !0,
                      identities: !1,
                      isIpfsGatewayEnabled: !1,
                      ipfsGateway: !1,
                      knownMethodData: !1,
                      ledgerTransportType: !0,
                      lostIdentities: !1,
                      openSeaEnabled: !0,
                      preferences: {
                        autoLockTimeLimit: !0,
                        hideZeroBalanceTokens: !0,
                        showExtensionInFullSizeView: !0,
                        showFiatInTestnets: !0,
                        showTestNetworks: !0,
                        smartTransactionsOptInStatus: !0,
                        tokenNetworkFilter: {},
                        showNativeTokenAsMainBalance: !0,
                        showConfirmationAdvancedDetails: !0,
                        privacyMode: !1,
                      },
                      useExternalServices: !1,
                      selectedAddress: !1,
                      snapRegistryList: !1,
                      theme: !0,
                      signatureSecurityAlertResponses: !1,
                      use4ByteResolution: !0,
                      useAddressBarEnsResolution: !0,
                      useBlockie: !0,
                      useCurrencyRateCheck: !0,
                      useMultiAccountBalanceChecker: !0,
                      useNftDetection: !0,
                      usePhishDetect: !0,
                      useTokenDetection: !0,
                      useTransactionSimulations: !0,
                      enableMV3TimestampSave: !0,
                    },
                    RemoteFeatureFlagController: { remoteFeatureFlags: !0, cacheTimestamp: !1 },
                    NotificationServicesPushController: { fcmToken: !1 },
                    MultichainRatesController: {
                      fiatCurrency: !0,
                      rates: !0,
                      cryptocurrencies: !0,
                    },
                    QueuedRequestController: { queuedRequestCount: !0 },
                    SelectedNetworkController: { domains: !1 },
                    SignatureController: {
                      unapprovedPersonalMsgCount: !0,
                      unapprovedPersonalMsgs: !1,
                      unapprovedTypedMessages: !1,
                      unapprovedTypedMessagesCount: !0,
                    },
                    SmartTransactionsController: {
                      smartTransactionsState: {
                        fees: { approvalTxFees: !0, tradeTxFees: !0 },
                        liveness: !0,
                        smartTransactions: !1,
                        userOptIn: !0,
                        userOptInV2: !0,
                      },
                    },
                    SnapController: { snaps: !1 },
                    SnapInterfaceController: { interfaces: !1 },
                    SnapInsightsController: { insights: !1 },
                    SnapsRegistry: { database: !1, lastUpdated: !1, databaseUnavailable: !1 },
                    SubjectMetadataController: { subjectMetadata: !1 },
                    SwapsController: {
                      swapsState: {
                        approveTxId: !1,
                        customApproveTxData: !1,
                        customGasPrice: !0,
                        customMaxFeePerGas: !0,
                        customMaxGas: !0,
                        customMaxPriorityFeePerGas: !0,
                        errorKey: !0,
                        fetchParams: !0,
                        quotes: !1,
                        quotesLastFetched: !0,
                        quotesPollingLimitEnabled: !0,
                        routeState: !0,
                        saveFetchedQuotes: !0,
                        selectedAggId: !0,
                        swapsFeatureFlags: !0,
                        swapsFeatureIsLive: !0,
                        swapsQuotePrefetchingRefreshTime: !0,
                        swapsQuoteRefreshTime: !0,
                        swapsStxBatchStatusRefreshTime: !0,
                        swapsStxStatusDeadline: !0,
                        swapsStxGetTransactionsRefreshTime: !0,
                        swapsStxMaxFeeMultiplier: !0,
                        swapsUserFeeLevel: !0,
                        tokens: !1,
                        topAggId: !1,
                        tradeTxId: !1,
                      },
                    },
                    TokenDetectionController: { [a.AllProperties]: !1 },
                    TokenListController: {
                      preventPollingOnNetworkRestart: !0,
                      tokenList: !1,
                      tokensChainsCache: { [a.AllProperties]: !1 },
                    },
                    TokenBalancesController: { tokenBalances: !1 },
                    TokenRatesController: { marketData: !1 },
                    TokensController: {
                      allDetectedTokens: { [a.AllProperties]: !1 },
                      allIgnoredTokens: { [a.AllProperties]: !1 },
                      allTokens: { [a.AllProperties]: !1 },
                      detectedTokens: !1,
                      ignoredTokens: !1,
                      tokens: !1,
                    },
                    TransactionController: {
                      transactions: !1,
                      lastFetchedBlockNumbers: !1,
                      methodData: !1,
                    },
                    TxController: { transactions: !1 },
                    UserOperationController: { userOperations: !1 },
                    UserStorageController: {
                      isProfileSyncingEnabled: !0,
                      isProfileSyncingUpdateLoading: !1,
                      hasAccountSyncingSyncedAtLeastOnce: !1,
                      isAccountSyncingReadyToBeDispatched: !1,
                    },
                  }),
                  o = Object.values(r).reduce((e, t) => ({ ...e, ...t }), {});
                n.SENTRY_UI_STATE = {
                  gas: !0,
                  history: !0,
                  appState: {
                    customNonceValue: !0,
                    isAccountMenuOpen: !0,
                    isNetworkMenuOpen: !0,
                    nextNonce: !0,
                    pendingTokens: !1,
                    welcomeScreenSeen: !0,
                    slides: !1,
                    confirmationExchangeRates: !0,
                  },
                  metamask: {
                    ...o,
                    isInitialized: !0,
                    useSafeChainsListValidation: !0,
                    watchEthereumAccountEnabled: !1,
                    addSnapAccountEnabled: !1,
                    snapsAddSnapAccountModalDismissed: !1,
                    switchedNetworkDetails: !1,
                    switchedNetworkNeverShowMessage: !1,
                    newPrivacyPolicyToastClickedOrClosed: !1,
                    newPrivacyPolicyToastShownDate: !1,
                  },
                  unconnectedAccount: !0,
                };
              };
            };
      },
      { package: '$root$', file: 'app/scripts/constants/sentry-state.ts' },
    ],
    [
      83,
      {
        '../../../../shared/lib/multichain/chain-agnostic-permission-utils/caip-accounts': 5840,
        '../../../../shared/lib/multichain/chain-agnostic-permission-utils/caip-chainids': 5841,
        '../../../../shared/modules/selectors/networks': 5875,
        '@metamask/chain-agnostic-permission': 1498,
        '@metamask/permission-controller': 2421,
        '@metamask/snaps-utils': 2890,
        '@metamask/utils': 2995,
        nanoid: 5027,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getPermissionBackgroundApiMethods = function ({
                    permissionController: e,
                    approvalController: t,
                    accountsController: n,
                    networkController: l,
                    multichainNetworkController: g,
                  }) {
                    const T = t => {
                        let n;
                        try {
                          n = e.getCaveat(t, o.Caip25EndowmentPermissionName, o.Caip25CaveatType);
                        } catch (e) {
                          if (!(e instanceof r.PermissionDoesNotExistError)) throw e;
                        }
                        return n;
                      },
                      m = (t, a) => {
                        const r = T(t);
                        if (!r)
                          throw new Error(
                            `Cannot add account permissions for origin "${t}": no permission currently exists for this origin.`
                          );
                        const s = a
                            .map(e => n.getAccountByAddress(e))
                            .map(e => `${e.scopes[0]}:${e.address}`),
                          m = (0, c.getCaipAccountIdsFromCaip25CaveatValue)(r.value),
                          p = (0, u.getAllScopesFromCaip25CaveatValue)(r.value),
                          S = Array.from(new Set([...m, ...s]));
                        let E = [...p];
                        const f = Object.keys(
                          (0, d.getNetworkConfigurationsByCaipChainId)({
                            networkConfigurationsByChainId: l.state.networkConfigurationsByChainId,
                            multichainNetworkConfigurationsByChainId:
                              g.state.multichainNetworkConfigurationsByChainId,
                            internalAccounts: n.state.internalAccounts,
                          })
                        );
                        S.forEach(e => {
                          const {
                            chain: { namespace: t },
                          } = (0, i.parseCaipAccountId)(e);
                          if (
                            !E.some(e => {
                              try {
                                const { namespace: n } = (0, i.parseCaipChainId)(e);
                                return t === n;
                              } catch (e) {
                                return !1;
                              }
                            })
                          ) {
                            const e = f.filter(e => {
                              try {
                                const { namespace: n } = (0, i.parseCaipChainId)(e);
                                return t === n;
                              } catch (e) {
                                return !1;
                              }
                            });
                            E = [...E, ...e];
                          }
                        });
                        const A = (0, o.setPermittedChainIds)(r.value, E),
                          _ = (0, o.setPermittedAccounts)(A, S);
                        e.updateCaveat(t, o.Caip25EndowmentPermissionName, o.Caip25CaveatType, _);
                      },
                      p = (t, n) => {
                        const a = T(t);
                        if (!a)
                          throw new Error(
                            `Cannot add chain permissions for origin "${t}": no permission currently exists for this origin.`
                          );
                        const r = Array.from(
                            new Set([...(0, u.getAllScopesFromCaip25CaveatValue)(a.value), ...n])
                          ),
                          s = (0, o.setPermittedChainIds)(a.value, r),
                          i = (0, c.getCaipAccountIdsFromCaip25CaveatValue)(a.value),
                          d = (0, o.setPermittedAccounts)(s, i);
                        e.updateCaveat(t, o.Caip25EndowmentPermissionName, o.Caip25CaveatType, d);
                      };
                    return {
                      addPermittedAccount: (e, t) => m(e, [t]),
                      addPermittedAccounts: (e, t) => m(e, t),
                      removePermittedAccount: (t, a) => {
                        const r = T(t);
                        if (!r)
                          throw new Error(
                            `Cannot remove account "${a}": No permissions exist for origin "${t}".`
                          );
                        const s = (0, c.getCaipAccountIdsFromCaip25CaveatValue)(r.value),
                          i = n.getAccountByAddress(a),
                          u = s.filter(e => !(0, c.isInternalAccountInPermittedAccountIds)(i, [e]));
                        if (u.length !== s.length)
                          if (0 === u.length)
                            e.revokePermission(t, o.Caip25EndowmentPermissionName);
                          else {
                            const n = (0, o.setPermittedAccounts)(r.value, u);
                            e.updateCaveat(
                              t,
                              o.Caip25EndowmentPermissionName,
                              o.Caip25CaveatType,
                              n
                            );
                          }
                      },
                      addPermittedChain: (e, t) => p(e, [t]),
                      addPermittedChains: (e, t) => p(e, t),
                      removePermittedChain: (t, n) => {
                        const a = T(t);
                        if (!a)
                          throw new Error(
                            `Cannot remove permission for chainId "${n}": No permissions exist for origin "${t}".`
                          );
                        const r = (0, u.getAllScopesFromCaip25CaveatValue)(a.value),
                          i = r.filter(e => e !== n);
                        if (i.length !== r.length)
                          if (0 !== i.length || (0, s.isSnapId)(t)) {
                            const n = (0, o.setPermittedChainIds)(a.value, i);
                            e.updateCaveat(
                              t,
                              o.Caip25EndowmentPermissionName,
                              o.Caip25CaveatType,
                              n
                            );
                          } else e.revokePermission(t, o.Caip25EndowmentPermissionName);
                      },
                      requestAccountsAndChainPermissionsWithId: n => {
                        const s = (0, a.nanoid)();
                        return (
                          (async (n, a) => {
                            const { permissions: s } = await t.addAndShowApprovalRequest({
                              id: a,
                              origin: n,
                              requestData: {
                                metadata: { id: a, origin: n },
                                permissions: {
                                  [o.Caip25EndowmentPermissionName]: {
                                    caveats: [
                                      {
                                        type: o.Caip25CaveatType,
                                        value: {
                                          requiredScopes: {},
                                          optionalScopes: {},
                                          isMultichainOrigin: !1,
                                        },
                                      },
                                    ],
                                  },
                                },
                              },
                              type: r.MethodNames.RequestPermissions,
                            });
                            e.grantPermissions({ subject: { origin: n }, approvedPermissions: s });
                          })(n, s),
                          s
                        );
                      },
                    };
                  });
                var a = e('nanoid'),
                  r = e('@metamask/permission-controller'),
                  o = e('@metamask/chain-agnostic-permission'),
                  s = e('@metamask/snaps-utils'),
                  i = e('@metamask/utils'),
                  c = e(
                    '../../../../shared/lib/multichain/chain-agnostic-permission-utils/caip-accounts'
                  ),
                  u = e(
                    '../../../../shared/lib/multichain/chain-agnostic-permission-utils/caip-chainids'
                  ),
                  d = e('../../../../shared/modules/selectors/networks');
              };
            };
      },
      { package: '$root$', file: 'app/scripts/controllers/permissions/background-api.js' },
    ],
    [
      84,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getRemovedAuthorizations = n.getChangedAuthorizations = n.diffMap = void 0);
                n.diffMap = (e, t) => {
                  if (t === undefined) return e;
                  const n = new Map();
                  if (e === t) return n;
                  const a = new Set([...e.keys()]);
                  for (const r of t.keys()) {
                    const o = e.get(r) ?? [];
                    o !== t.get(r) && n.set(r, o), a.delete(r);
                  }
                  for (const t of a.keys()) n.set(t, e.get(t));
                  return n;
                };
                n.getChangedAuthorizations = (e, t) => {
                  if (t === undefined) return e;
                  const n = new Map();
                  if (e === t) return n;
                  const a = new Set([...e.keys()]);
                  for (const r of t.keys()) {
                    const o = e.get(r) ?? { requiredScopes: {}, optionalScopes: {} };
                    t.get(r) !== o &&
                      n.set(r, {
                        requiredScopes: o.requiredScopes,
                        optionalScopes: o.optionalScopes,
                      }),
                      a.delete(r);
                  }
                  for (const t of a.keys()) n.set(t, e.get(t));
                  return n;
                };
                n.getRemovedAuthorizations = (e, t) => {
                  const n = new Map();
                  if (t === undefined || e === t) return n;
                  for (const [a, r] of t.entries()) {
                    const t = e.get(a);
                    if (!t) {
                      n.set(a, r);
                      continue;
                    }
                    const o = {};
                    Object.entries(r.requiredScopes).forEach(([e, n]) => {
                      t.requiredScopes[e] || (o[e] = n);
                    });
                    const s = {};
                    Object.entries(r.optionalScopes).forEach(([e, n]) => {
                      t.optionalScopes[e] || (s[e] = n);
                    }),
                      (Object.keys(o).length > 0 || Object.keys(s).length > 0) &&
                        n.set(a, { requiredScopes: o, optionalScopes: s });
                  }
                  return n;
                };
              };
            };
      },
      { package: '$root$', file: 'app/scripts/controllers/permissions/differs.ts' },
    ],
    [
      85,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NOTIFICATION_NAMES = void 0);
                n.NOTIFICATION_NAMES = (function (e) {
                  return (
                    (e.accountsChanged = 'metamask_accountsChanged'),
                    (e.chainChanged = 'metamask_chainChanged'),
                    e
                  );
                })({});
              };
            };
      },
      { package: '$root$', file: 'app/scripts/controllers/permissions/enums.ts' },
    ],
    [
      86,
      {
        './background-api': 83,
        './differs': 84,
        './enums': 85,
        './selectors': 87,
        './specifications': 88,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./background-api');
                Object.keys(a).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === a[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return a[e];
                        },
                      }));
                });
                var r = e('./differs');
                Object.keys(r).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === r[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return r[e];
                        },
                      }));
                });
                var o = e('./enums');
                Object.keys(o).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === o[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return o[e];
                        },
                      }));
                });
                var s = e('./specifications');
                Object.keys(s).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === s[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return s[e];
                        },
                      }));
                });
                var i = e('./selectors');
                Object.keys(i).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === i[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return i[e];
                        },
                      }));
                });
              };
            };
      },
      { package: '$root$', file: 'app/scripts/controllers/permissions/index.js' },
    ],
    [
      87,
      { '@metamask/chain-agnostic-permission': 1498, reselect: 5353 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getPermittedChainsByOrigin =
                    n.getPermittedAccountsForScopesByOrigin =
                    n.getPermittedAccountsByOrigin =
                    n.getOriginsWithSessionProperty =
                    n.getAuthorizedScopesByOrigin =
                      void 0);
                var a = e('@metamask/chain-agnostic-permission'),
                  r = e('reselect');
                const o = e => e.subjects;
                (n.getPermittedAccountsByOrigin = (0, r.createSelector)(o, e => {
                  const t = new Map();
                  return (
                    Object.values(e).forEach(e => {
                      var n;
                      const r = (
                        (null === (n = e.permissions) ||
                        void 0 === n ||
                        null === (n = n[a.Caip25EndowmentPermissionName]) ||
                        void 0 === n
                          ? void 0
                          : n.caveats) || []
                      ).find(({ type: e }) => e === a.Caip25CaveatType);
                      if (r) {
                        const n = (0, a.getEthAccounts)(r.value);
                        t.set(e.origin, n);
                      }
                    }),
                    t
                  );
                })),
                  (n.getPermittedAccountsForScopesByOrigin = (0, r.createSelector)(
                    o,
                    (e, t) => t,
                    (e, t) => {
                      const n = new Map();
                      return (
                        Object.values(e).forEach(e => {
                          var r;
                          const o = (
                            (null === (r = e.permissions) ||
                            void 0 === r ||
                            null === (r = r[a.Caip25EndowmentPermissionName]) ||
                            void 0 === r
                              ? void 0
                              : r.caveats) || []
                          ).find(({ type: e }) => e === a.Caip25CaveatType);
                          if (o) {
                            const r = (0, a.getPermittedAccountsForScopes)(o.value, t);
                            r.length > 0 && n.set(e.origin, r);
                          }
                        }),
                        n
                      );
                    }
                  )),
                  (n.getOriginsWithSessionProperty = (0, r.createSelector)(
                    o,
                    (e, t) => t,
                    (e, t) => {
                      const n = {};
                      return (
                        Object.values(e).forEach(e => {
                          var r, o;
                          const s = (
                              (null === (r = e.permissions) ||
                              void 0 === r ||
                              null === (r = r[a.Caip25EndowmentPermissionName]) ||
                              void 0 === r
                                ? void 0
                                : r.caveats) || []
                            ).find(({ type: e }) => e === a.Caip25CaveatType),
                            i =
                              null == s ||
                              null === (o = s.value) ||
                              void 0 === o ||
                              null === (o = o.sessionProperties) ||
                              void 0 === o
                                ? void 0
                                : o[t];
                          i !== undefined && (n[e.origin] = i);
                        }),
                        n
                      );
                    }
                  )),
                  (n.getAuthorizedScopesByOrigin = (0, r.createSelector)(o, e =>
                    Object.values(e).reduce((e, t) => {
                      var n;
                      const r = (
                        (null === (n = t.permissions) ||
                        void 0 === n ||
                        null === (n = n[a.Caip25EndowmentPermissionName]) ||
                        void 0 === n
                          ? void 0
                          : n.caveats) || []
                      ).find(({ type: e }) => e === a.Caip25CaveatType);
                      return r && e.set(t.origin, r.value), e;
                    }, new Map())
                  )),
                  (n.getPermittedChainsByOrigin = (0, r.createSelector)(o, e =>
                    Object.values(e).reduce((e, t) => {
                      var n;
                      const r = (
                        (null === (n = t.permissions) ||
                        void 0 === n ||
                        null === (n = n[a.Caip25EndowmentPermissionName]) ||
                        void 0 === n
                          ? void 0
                          : n.caveats) || []
                      ).find(({ type: e }) => e === a.Caip25CaveatType);
                      if (r) {
                        const n = (0, a.getPermittedEthChainIds)(r.value);
                        e.set(t.origin, n);
                      }
                      return e;
                    }, new Map())
                  ));
              };
            };
      },
      { package: '$root$', file: 'app/scripts/controllers/permissions/selectors.js' },
    ],
    [
      88,
      {
        '../../../../shared/constants/permissions': 5808,
        '@metamask/chain-agnostic-permission': 1498,
        '@metamask/snaps-rpc-methods': 2733,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.unrestrictedMethods =
                    n.unrestrictedEthSigningMethods =
                    n.getPermissionSpecifications =
                    n.getCaveatSpecifications =
                    n.PermissionNames =
                    n.CaveatFactories =
                      void 0);
                var a = e('@metamask/snaps-rpc-methods'),
                  r = e('@metamask/chain-agnostic-permission'),
                  o = e('../../../../shared/constants/permissions');
                (n.PermissionNames = Object.freeze({
                  ...o.RestrictedMethods,
                  ...o.EndowmentTypes,
                })),
                  (n.CaveatFactories = Object.freeze({
                    [r.Caip25CaveatType]: r.createCaip25Caveat,
                  }));
                n.getCaveatSpecifications = ({
                  listAccounts: e,
                  findNetworkClientIdByChainId: t,
                  isNonEvmScopeSupported: n,
                  getNonEvmAccountAddresses: o,
                }) => ({
                  [r.Caip25CaveatType]: (0, r.caip25CaveatBuilder)({
                    listAccounts: e,
                    findNetworkClientIdByChainId: t,
                    isNonEvmScopeSupported: n,
                    getNonEvmAccountAddresses: o,
                  }),
                  ...a.caveatSpecifications,
                  ...a.endowmentCaveatSpecifications,
                });
                n.getPermissionSpecifications = () => ({
                  [r.caip25EndowmentBuilder.targetName]:
                    r.caip25EndowmentBuilder.specificationBuilder({}),
                });
                (n.unrestrictedEthSigningMethods = Object.freeze([
                  'eth_sendRawTransaction',
                  'eth_sendTransaction',
                  'eth_signTypedData',
                  'eth_signTypedData_v1',
                  'eth_signTypedData_v3',
                  'eth_signTypedData_v4',
                ])),
                  (n.unrestrictedMethods = Object.freeze([
                    'eth_blockNumber',
                    'eth_call',
                    'eth_chainId',
                    'eth_coinbase',
                    'eth_decrypt',
                    'eth_estimateGas',
                    'eth_feeHistory',
                    'eth_gasPrice',
                    'eth_getBalance',
                    'eth_getBlockByHash',
                    'eth_getBlockByNumber',
                    'eth_getBlockTransactionCountByHash',
                    'eth_getBlockTransactionCountByNumber',
                    'eth_getCode',
                    'eth_getEncryptionPublicKey',
                    'eth_getFilterChanges',
                    'eth_getFilterLogs',
                    'eth_getLogs',
                    'eth_getProof',
                    'eth_getStorageAt',
                    'eth_getTransactionByBlockHashAndIndex',
                    'eth_getTransactionByBlockNumberAndIndex',
                    'eth_getTransactionByHash',
                    'eth_getTransactionCount',
                    'eth_getTransactionReceipt',
                    'eth_getUncleByBlockHashAndIndex',
                    'eth_getUncleByBlockNumberAndIndex',
                    'eth_getUncleCountByBlockHash',
                    'eth_getUncleCountByBlockNumber',
                    'eth_getWork',
                    'eth_hashrate',
                    'eth_mining',
                    'eth_newBlockFilter',
                    'eth_newFilter',
                    'eth_newPendingTransactionFilter',
                    'eth_protocolVersion',
                    'eth_requestAccounts',
                    'eth_sendRawTransaction',
                    'eth_sendTransaction',
                    'eth_signTypedData',
                    'eth_signTypedData_v1',
                    'eth_signTypedData_v3',
                    'eth_signTypedData_v4',
                    'eth_submitHashrate',
                    'eth_submitWork',
                    'eth_subscribe',
                    'eth_syncing',
                    'eth_uninstallFilter',
                    'eth_unsubscribe',
                    'metamask_getProviderState',
                    'metamask_logWeb3ShimUsage',
                    'metamask_sendDomainMetadata',
                    'metamask_watchAsset',
                    'net_listening',
                    'net_peerCount',
                    'net_version',
                    'personal_ecRecover',
                    'personal_sign',
                    'wallet_addEthereumChain',
                    'wallet_getCallsStatus',
                    'wallet_getCapabilities',
                    'wallet_getPermissions',
                    'wallet_requestPermissions',
                    'wallet_revokePermissions',
                    'wallet_registerOnboarding',
                    'wallet_sendCalls',
                    'wallet_switchEthereumChain',
                    'wallet_watchAsset',
                    'web3_clientVersion',
                    'web3_sha3',
                    'wallet_getAllSnaps',
                    'wallet_getSnaps',
                    'wallet_requestSnaps',
                    'wallet_invokeSnap',
                    'wallet_invokeKeyring',
                    'snap_getClientStatus',
                    'snap_getCurrencyRate',
                    'snap_clearState',
                    'snap_getFile',
                    'snap_getState',
                    'snap_listEntropySources',
                    'snap_createInterface',
                    'snap_updateInterface',
                    'snap_getInterfaceState',
                    'snap_getInterfaceContext',
                    'snap_resolveInterface',
                    'snap_setState',
                    'snap_scheduleBackgroundEvent',
                    'snap_cancelBackgroundEvent',
                    'snap_getBackgroundEvents',
                    'snap_experimentalProviderRequest',
                  ]));
              };
            };
      },
      { package: '$root$', file: 'app/scripts/controllers/permissions/specifications.js' },
    ],
  ],
  [],
  {}
);
