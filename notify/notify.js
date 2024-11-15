(function() {
    function retry(isDone, next) {
        let current_try = 0
          , max_retry = 50
          , is_timeout = !1
          , id = window.setInterval(function() {
            isDone() && (window.clearInterval(id),
            next(is_timeout));
            current_try++ > max_retry && (window.clearInterval(id),
            is_timeout = !0,
            next(is_timeout))
        }, 10)
    }
    function isIE10OrLater(user_agent) {
        let ua = user_agent.toLowerCase();
        if (0 === ua.indexOf("msie") && 0 === ua.indexOf("trident"))
            return !1;
        let match = /(?:msie|rv:)\s?([\d\.]+)/.exec(ua);
        return !!(match && parseInt(match[1], 10) >= 10)
    }
    function detectPrivateMode(callback) {
        let is_private;
        if (window.webkitRequestFileSystem)
            window.webkitRequestFileSystem(window.TEMPORARY, 1, function() {
                try {
                    window.localStorage.setItem("test", 1)
                } catch (e) {
                    is_private = !0
                }
                "undefined" == typeof is_private && (is_private = !1,
                window.localStorage.removeItem("test"))
            }, function() {
                is_private = !0
            });
        else if (window.indexedDB && /Firefox/.test(window.navigator.userAgent)) {
            let db;
            try {
                db = window.indexedDB.open("test")
            } catch (e) {
                is_private = !0
            }
            "undefined" == typeof is_private && retry(function() {
                return "done" === db.readyState
            }, function(is_timeout) {
                is_timeout || (is_private = !db.result)
            })
        } else if (isIE10OrLater(window.navigator.userAgent)) {
            is_private = !1;
            try {
                window.indexedDB || (is_private = !0)
            } catch (e) {
                is_private = !0
            }
        } else if (window.localStorage && /Safari/.test(window.navigator.userAgent)) {
            try {
                window.localStorage.setItem("test", 1)
            } catch (e) {
                is_private = !0
            }
            "undefined" == typeof is_private && (is_private = !1,
            window.localStorage.removeItem("test"))
        }
        retry(function() {
            return "undefined" != typeof is_private
        }, function() {
            callback(is_private)
        })
    }
    function getBrowser() {
        var tem, ua = navigator.userAgent, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [], isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        return /trident/i.test(M[1]) ? (tem = /\brv[ :]+(\d+)/g.exec(ua) || [],
        {
            name: "IE",
            version: tem[1] || ""
        }) : "Chrome" === M[1] && (tem = ua.match(/\bOPR\/(\d+)/),
        null != tem) ? {
            name: "Opera",
            version: tem[1]
        } : (M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"],
        null != (tem = ua.match(/version\/(\d+)/i)) && M.splice(1, 1, tem[1]),
        isiOS && (M[0] = "iOS"),
        M[0] = M[0].toLowerCase(),
        {
            name: M[0],
            version: M[1]
        })
    }
    function getAndroidVersion() {
        var ua = navigator.userAgent.toLowerCase()
          , match = ua.match(/android\s([0-9\.]*)/);
        return match ? match[1] : !1
    }
    function getMyElementsList(selector) {
        return document.querySelectorAll(selector) ? document.querySelectorAll(selector) : {}
    }
    function transformInToFormObject(data) {
        return new URLSearchParams(data).toString()
    }
    function setMyClickOn(eventType, selector, callback) {
        document.body.addEventListener(eventType, function(event) {
            selector === "" || event.target.matches(selector) ? callback.call(event.target) : (selector === "" || event.target.parentElement.matches(selector)) && callback.call(event.target.parentElement)
        })
    }
    function getMyElement(selector) {
        return document.querySelector(selector) ? document.querySelector(selector) : !1
    }
    function SetMyElementHtml(selector, html) {
        document.querySelector(selector) && (document.querySelector(selector).innerHTML = html)
    }
    function addMyClass(selector, className) {
        document.querySelector(selector) && className.split(" ").forEach(function(addClass) {
            document.querySelector(selector).classList.add(addClass)
        })
    }
    function removeMyClass(selector, className) {
        document.querySelector(selector) && className.split(" ").forEach(function(removeClass) {
            document.querySelector(selector).classList.remove(removeClass)
        })
    }
    function changeMyProp(selector, prop, value) {
        document.querySelector(selector) && document.querySelector(selector).style.setProperty(prop, value)
    }
    function myFadeOut(elTag, timeout) {
        if (getMyElement(elTag)) {
            let el = getMyElement(elTag);
            el.style.opacity = 1;
            el.style.transition = "opacity " + timeout + "ms";
            el.style.opacity = 0;
            setTimeout(function() {
                el.style.display = "none"
            }, timeout)
        }
    }
    function MyDeferred() {
        let res, rej, p = new Promise(function(a, b) {
            res = a;
            rej = b
        }
        );
        return p.resolve = res,
        p.reject = rej,
        p
    }
    var localization_text = {
        ru: {
            Subscribe: "Подписаться",
            Cancel: "Отказаться",
            ViewPushText: "Пуш-уведомления выглядят так",
            PushDisable: "Вы всегда можете отключить пуш-уведомления в настройках вашего браузера или кликнув правой кнопкой мыши по уведомлению."
        },
        en: {
            Subscribe: "Subscribe",
            Cancel: "Cancel",
            ViewPushText: "Push notifications look like this",
            PushDisable: "You can always disable push-notifications in your browser settings or by right-clicking on the notification."
        },
        fr: {
            Subscribe: "Souscrire",
            Cancel: "Annuler",
            ViewPushText: "Les notifications push sont les suivantes.",
            PushDisable: "Vous pouvez toujours désactiver les notifications push dans les paramètres de votre navigateur Web ou par un clic droit sur la notification."
        },
        bg: {
            Subscribe: "Абонирай се",
            Cancel: "Отказ",
            ViewPushText: "Известия за предаване са, както следва.",
            PushDisable: "Винаги можете да изключите известията за предаване в настройките на вашия браузер или кликнете с десен бутон на уведомлението."
        },
        zh: {
            Subscribe: "订阅",
            Cancel: "取消",
            ViewPushText: "推送通知如下。",
            PushDisable: "您可以随时在你的网页浏览器的设置或通过在通知右键单击禁用推送通知。"
        },
        uk: {
            Subscribe: "Підписуватися",
            Cancel: "Скасувати",
            ViewPushText: "Пуш-уведомления виглядят так",
            PushDisable: "Ви завжди можете відключити пух-повідомлення в настройках вашої браузера або натиснувши праву кнопку миші за повідомленням."
        },
        be: {
            Subscribe: "Падпісвацца",
            Cancel: "Адмяніць",
            ViewPushText: "Пуш-повідомлення виглядають так.",
            PushDisable: "Ви завжди можете відключити пуш-повідомлення в налаштуваннях вашого браузера або клікнувши правою кнопкою миші по повідомленню."
        },
        kk: {
            Subscribe: "Жазылу",
            Cancel: "Күшін жою",
            ViewPushText: "Төмендегідей хабарландырулар болып табылады итеріңіз.",
            PushDisable: "Сіз әрқашан сіздің веб-шолғыш параметрлері немесе хабарлама туралы оң жақ түймешігімен нұқу арқылы ескерту хабарландыруларын ажыратуға болады."
        },
        de: {
            Subscribe: "Abonnieren",
            Cancel: "Stornieren",
            ViewPushText: "Push-Benachrichtigungen sind wie folgt.",
            PushDisable: "Sie können immer Push-Benachrichtigungen in den Einstellungen Ihres Web-Browser oder mit der rechten Maustaste auf die Benachrichtigung deaktivieren."
        },
        ar: {
            Subscribe: "الاشتراك",
            Cancel: "إلغاء",
            ViewPushText: "دفع الإخطارات هي على النحو التالي.",
            PushDisable: "يمكنك تعطيل دائما دفع الإخطارات في إعدادات متصفح الويب الخاص بك أو عن طريق النقر بزر الماوس الأيمن على الإخطار."
        },
        it: {
            Subscribe: "Sottoscrivi",
            Cancel: "Annulla",
            ViewPushText: "Le notifiche push sono le seguenti.",
            PushDisable: "È sempre possibile disattivare le notifiche push nelle impostazioni del tuo browser o facendo clic destro sulla notifica."
        },
        es: {
            Subscribe: "Suscribir",
            Cancel: "Cancelar",
            ViewPushText: "Notificaciones push son los siguientes.",
            PushDisable: "Siempre se puede desactivar las notificaciones push en la configuración de tu navegador web o haciendo clic derecho en la notificación."
        },
        pt: {
            Subscribe: "Se inscrever",
            Cancel: "Cancelar",
            ViewPushText: "Notificações push são as seguintes.",
            PushDisable: "Você sempre pode desativar as notificações push nas configurações do seu navegador ou clicando com o botão direito sobre a notificação."
        },
        ja: {
            Subscribe: "申し込む",
            Cancel: "キャンセル",
            ViewPushText: "次のようにプッシュ通知があります。",
            PushDisable: "あなたは常にあなたのウェブブラウザの設定や通知を右クリックしてプッシュ通知を無効にすることができます。"
        },
        tr: {
            Subscribe: "Evet",
            Cancel: "Hayır",
            ViewPushText: "Şöyle itin bildirimleri bulunmaktadır.",
            PushDisable: "Her zaman, web tarayıcısının ayarlarında veya bildirimini sağ tıklayarak push bildirimleri devre dışı bırakabilir."
        }
    }, pushsenderConfig = {
        scriptVersion: 2,
        hash: "d2b8e6f6bc614534b6a3763e7afc1a8c",
        useSubdomainBasket: "1",
        origin: "https",
        swPath: "/sw.js",
        firefoxSwPath: "/sw.js",
        manifestUrl: "/manifest.json",
        serverSyncUrl: "https://push4site.com/Subscriber/Add/v2",
        subscribe_url: "https://vastrp.push4site.com/Sdk/Subscribe",
        cssUrl: "https://push4site.com/Content/WidgetsStyles.css",
        subdomain: "vastrp",
        domainForStorageUtil: ".vastrp.ru",
        selfHostedSubdomainUrl: "https://vastrp.ru",
        cookieStorageList: ["push_subscriber_id", "push_uid", "push_subscription_status", "push_subscription_id"],
        secondsTrigger: 10,
        unsubscribeDays: 0,
        subscriptionBackProto: '<div style="display:none" id="p4sbackInfoDiv" class="p4s-webpush-label p4s-{OS} p4s-{BROWSER} p4s-base-lang p4s-show"><div class="p4s-inner-content"><a class="p4s-copyright-link" target="_blank" href="https://push4site.com/poweredbyredirect/?utm_referrer=vastrp.ru&utm_source=widget">powered by Push<span class="logoLetter">4<\/span>site<\/a><\/div><\/div>',
        subscriptionBackStatus: !0,
        tooltips: {
            nativeSubscription: {
                text: "",
                display: !1,
                delay: 200
            }
        },
        trackUrl: "https://push4site.com/sdk/Tracking",
        iconUrl: "https://push4site.com/SiteImages/d5adef33-1b6c-4480-a20e-c0b2905daa34.png",
        HidePoweredBy: !0,
        sendDisplayInfoTiming: 15,
        sendDisplayInfoPages: 2,
        subscribe_form_url: "https://vastrp.push4site.com/Sdk/Subscriptionform",
        prefix_tag: "p4s_p_",
        selfSubscribeDomain: !0,
        selfSubDomainSubscribe: !1,
        oneSubscriptionForDomain: !0,
        mainSubscriptionDomain: "vastrp.ru",
        localizationLang: "auto",
        SafariEnabled: !1,
        safariId: "",
        FcmVapidPublicKey: "BK1PPNnKf9KLduxFHvi5ZrLhb7PHuGokXFRrwK1GgutBdLWhiuzni-ZDtdnH-b9ECbkbhEzcztbLSKLYuEzvaGU",
        unsubscribeUrl: "https://push4site.com/Sdk/Unsubscribe",
        eventsUrl: "https://push4site.com/sdk/TrackingEventCallback",
        needTrackEvents: !1,
        trackEvents: {},
        Integrations: {
            Avangate: {
                enabled: !1,
                storeURL: ""
            }
        },
        diplayConfig: {
            Topics: [],
            Button: {
                display: !1,
                type: "",
                text: "",
                color: ""
            },
            Label: {
                display: !1,
                position: "",
                color: "",
                displayParam: "",
                delayTime: 0,
                displayPosition: "",
                titleText: "Получить пуш сообщения с сайта",
                replyPeriod: 0
            },
            Dialog: {
                display: !1,
                mainText: "",
                aditionalText: "",
                color: "",
                buttonColor: "",
                position: "",
                displayParam: "",
                delayTime: 0,
                scrollPosition: "",
                viewCount: 0,
                replyPeriod: 0
            },
            PopUp: {
                display: !1,
                title: "",
                text: "",
                image: "https://push4site.com/Images/PopupDefault.png",
                displayParam: "",
                delayTime: 0,
                scrollPosition: "",
                viewCount: 0,
                buttonText: "Подписаться",
                replyPeriod: 0
            },
            Designer: {
                display: !1,
                title: "",
                text: "",
                buttonColor: "",
                buttonTextColor: "",
                image: "https://push4site.com/Images/DesignerDefault.png",
                image2: "https://push4site.com/SiteImages/d5adef33-1b6c-4480-a20e-c0b2905daa34.png",
                position: "center",
                displayParam: "",
                delayTime: 0,
                scrollPosition: "",
                viewCount: 0,
                buttonText: "Подписаться",
                replyPeriod: 0
            },
            Native: {
                display: !0,
                displayParam: "delay",
                delayTime: 0,
                viewCount: 0,
                replyPeriod: 1440,
                replyEnabled: !0,
                replySettings: {
                    title: "Еще не передумали о подписке?",
                    text: "Разблокируйте уведомления в окне рядом с адресной строкой",
                    imagePath: "https://push4site.com/Images/Widgets/native_review_icon.png"
                }
            },
            Bell: {
                display: !1,
                subscribeText: "",
                unsubscribeText: "",
                buttonTextColor: "",
                buttonColor: "",
                tooltipText: ""
            }
        }
    }, pushAPI = pushAPI || {}, _utils, onReadyStateChange;
    pushAPI.localizationUtil = function() {
        var CurrentLang, BaseLang;
        return pushsenderConfig.localizationLang != "auto" ? CurrentLang = pushsenderConfig.localizationLang.toLowerCase() : (CurrentLang = navigator.browserLanguage || navigator.language || navigator.userLanguage,
        CurrentLang = CurrentLang.substr(0, 2)),
        BaseLang = "ru",
        {
            GetLocalization: function(text) {
                return typeof localization_text[CurrentLang] != "undefined" && typeof localization_text[CurrentLang][text] != "undefined" ? localization_text[CurrentLang][text] : localization_text[BaseLang][text]
            }
        }
    }();
    pushAPI.getFirstBrowserLanguage = function() {
        var nav = window.navigator, browserLanguagePropertyKeys = ["language", "browserLanguage", "systemLanguage", "userLanguage"], i, language;
        if (Array.isArray(nav.languages))
            for (i = 0; i < nav.languages.length; i++)
                if (language = nav.languages[i],
                language && language.length)
                    return language.substring(0, 2).toLowerCase();
        for (i = 0; i < browserLanguagePropertyKeys.length; i++)
            if (language = nav[browserLanguagePropertyKeys[i]],
            language && language.length)
                return language.substring(0, 2).toLowerCase();
        return null
    }
    ;
    pushAPI.Integration = function() {
        return {
            Avangate: function(e, subscriberId) {
                var ahref = e.currentTarget.href;
                ahref.indexOf(pushsenderConfig.Integrations.Avangate.storeURL) != -1 && ahref.indexOf("p4s_p_push_subscriber_id=") == -1 && (e.currentTarget.href = ahref + "&p4s_p_push_subscriber_id=" + subscriberId)
            }
        }
    }();
    pushAPI.eventsApi = function() {
        return {
            validateEvents: function(subscriberId) {
                var currentSubscriberId = subscriberId, eventHandler = function(eventId, eventData) {
                    var currentLocation = pushAPI.eventsApi.trimProtocol(document.location.href.toLowerCase()).replace(/^www./g, "");
                    eventData.type == "pageview" && (eventData.exactUrl && currentLocation == eventData.url || !eventData.exactUrl && currentLocation.indexOf(eventData.url) != -1) && fetch(pushsenderConfig.eventsUrl, {
                        method: "POST",
                        body: transformInToFormObject({
                            subscriberId: currentSubscriberId,
                            eventId: eventId
                        }),
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    })
                }, isClickInsideElement = function(event, $elements) {
                    var i, element, rect;
                    if ($elements == !1 || $elements.length == 0)
                        return !1;
                    var getElementOffsetRect = function(elem) {
                        var box = elem.getBoundingClientRect()
                          , body = document.body
                          , docElem = document.documentElement
                          , scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
                          , scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
                          , clientTop = docElem.clientTop || body.clientTop || 0
                          , clientLeft = docElem.clientLeft || body.clientLeft || 0
                          , top = box.top + scrollTop - clientTop
                          , left = box.left + scrollLeft - clientLeft;
                        return {
                            top: Math.round(top),
                            left: Math.round(left),
                            bottom: Math.round(box.height + top),
                            right: Math.round(box.width + left)
                        }
                    }
                      , clickX = event.pageX
                      , clickY = event.pageY;
                    for (i = 0; i < $elements.length; i++)
                        if (element = $elements[i],
                        rect = getElementOffsetRect(element),
                        rect.left <= clickX && clickX <= rect.right && rect.top <= clickY && clickY <= rect.bottom)
                            return !0;
                    return !1
                }, documentClickHandler = function(event) {
                    Object.keys(pushsenderConfig.trackEvents).map(function(trackId) {
                        let trackData = pushsenderConfig.trackEvents[trackId];
                        if (trackData.type == "click" && isClickInsideElement(event, getMyElementsList(trackData.jqselector))) {
                            var location = pushAPI.eventsApi.trimProtocol(document.location.href.toLowerCase()).replace(/^www./g, "");
                            (trackData.exactUrl && location == trackData.url || !trackData.exactUrl && location.indexOf(trackData.url) != -1 || trackData.url == null) && fetch(pushsenderConfig.eventsUrl, {
                                method: "POST",
                                body: transformInToFormObject({
                                    subscriberId: currentSubscriberId,
                                    eventId: trackId
                                }),
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                }
                            })
                        }
                    })
                }, lastLocation;
                document.body.addEventListener("click", documentClickHandler, !0);
                Object.keys(pushsenderConfig.trackEvents).map(function(eventId) {
                    eventHandler(eventId, pushsenderConfig.trackEvents[eventId])
                });
                lastLocation = document.location.href;
                setInterval(function() {
                    let location = document.location.href;
                    if (lastLocation != location) {
                        try {
                            Object.keys(pushsenderConfig.trackEvents).map(function(eventId) {
                                eventHandler(eventId, pushsenderConfig.trackEvents[eventId])
                            })
                        } catch (e) {}
                        lastLocation = location
                    }
                }, 2e3)
            },
            trimProtocol: function(url) {
                return url.replace(/.*?:\/\//g, "")
            }
        }
    }();
    pushAPI.bitrixBasket = function() {
        var currentLocation = document.location.href.toLowerCase();
        return {
            validateBasket: function(subscriberId) {
                var isBasketUrl = function() {
                    for (var basketUrl, i = 0; i < BasketConfig.basketUrls.length; i++)
                        if (basketUrl = BasketConfig.basketUrls[i],
                        currentLocation.indexOf(basketUrl.toLowerCase()) != -1)
                            return !0;
                    return !1
                }
                  , currentSubscriberId = subscriberId;
                BasketConfig.basketType == "buttonClick" ? document.addEventListener("click", function(event) {
                    let selector = BasketConfig.paymentStartSelector;
                    event.target.matches(selector + ", " + selector + " *") && fetch(BasketConfig.notifyBasketUrlSimple, {
                        method: "POST",
                        body: transformInToFormObject({
                            subscriberId: currentSubscriberId
                        }),
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    })
                }) : isBasketUrl() && (BasketConfig.basketType == "extended" ? window.setTimeout(function() {
                    var BasketItems = []
                      , isArrayOfUrls = 1;
                    BasketConfig.itemsSelector != "" && getMyElementsList(BasketConfig.itemsSelector).forEach(function(el) {
                        el.querySelector("a") && BasketItems.push(el.querySelector("a").getAttribute("href"))
                    });
                    BasketConfig.customItemSelector ? isArrayOfUrls = 0 : BasketConfig.itemIdSelector != "" && (getMyElementsList(BasketConfig.itemIdSelector).forEach(function(el) {
                        BasketItems.push(el.value)
                    }),
                    isArrayOfUrls = 0);
                    BasketItems.length >= 0 && fetch(BasketConfig.notifyBasketUrl, {
                        method: "POST",
                        body: transformInToFormObject({
                            productIds: JSON.stringify(BasketItems),
                            subscriberId: currentSubscriberId,
                            isArrayOfUrls: isArrayOfUrls
                        }),
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    })
                }, 2e3) : BasketConfig.basketType == "simple" && fetch(BasketConfig.notifyBasketUrlSimple, {
                    method: "POST",
                    body: transformInToFormObject({
                        subscriberId: currentSubscriberId
                    }),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }));
                BasketConfig.startUrl != "" && currentLocation.indexOf(BasketConfig.startUrl) != -1 && fetch(BasketConfig.notifyPaymentStartUrl, {
                    method: "POST",
                    body: transformInToFormObject({
                        subscriberId: currentSubscriberId
                    }),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                });
                BasketConfig.notifyPaymentCompletedUrl != "" && (currentLocation.indexOf(BasketConfig.completeUrl) != -1 && fetch(BasketConfig.notifyPaymentCompletedUrl, {
                    method: "POST",
                    body: transformInToFormObject({
                        subscriberId: currentSubscriberId
                    }),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }),
                BasketConfig.paymentCompleteSelector && BasketConfig.paymentCompleteSelector.length > 0 && document.addEventListener("click", function(event) {
                    let selector = BasketConfig.paymentCompleteSelector;
                    event.target.matches(selector + ", " + selector + " *") && fetch(BasketConfig.notifyBasketUrlSimple, {
                        method: "POST",
                        body: transformInToFormObject({
                            subscriberId: currentSubscriberId
                        }),
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    })
                }))
            }
        }
    }();
    pushAPI.storageUtil = function() {
        var isLocalStorageEnabled = !1
          , domainForCookieStorage = "";
        return {
            initialiseState: function(domainForStorageUtil) {
                domainForCookieStorage = domainForStorageUtil;
                try {
                    "localStorage"in window && null !== window.localStorage && (isLocalStorageEnabled = !0)
                } catch (e) {
                    isLocalStorageEnabled = !1
                }
            },
            getCookie: function(cname) {
                for (var c, name = cname + "=", ca = document.cookie.split(";"), i = 0; i < ca.length; i++) {
                    for (c = ca[i]; " " === c.charAt(0); )
                        c = c.substring(1);
                    if (0 === c.indexOf(name))
                        return c.substring(name.length, c.length)
                }
                return !1
            },
            setCookie: function(name, value, exdays) {
                var d, expires;
                (pushsenderConfig.cookieStorageList.includes(name.replace(pushsenderConfig.prefix_tag, "")) || !isLocalStorageEnabled) && (d = new Date,
                d.setTime(d.getTime() + 864e5 * parseInt(exdays)),
                expires = "expires=" + d.toUTCString(),
                document.cookie = "self" == domainForCookieStorage ? name + "=" + value + ";path=/;" + expires + ";secure;samesite=strict" : name + "=" + value + ";domain=" + domainForCookieStorage + ";path=/;" + expires + ";secure;samesite=strict")
            },
            setCookieMainDomain: function(name, value, exdays) {
                var d = new Date, expires;
                d.setTime(d.getTime() + 864e5 * parseInt(exdays));
                expires = "expires=" + d.toUTCString();
                document.cookie = name + "=" + value + ";domain=" + pushsenderConfig.mainSubscriptionDomain + ";path=/;" + expires + ";secure;samesite=strict"
            },
            addToStorage: function(name, value, exdays) {
                isLocalStorageEnabled && localStorage.setItem(name, value);
                this.setCookie(name, value, exdays)
            },
            getFromStorage: function(cname) {
                return localStorage.getItem(cname) || this.getCookie(cname) ? localStorage.getItem(cname) || this.getCookie(cname) : ""
            },
            deleteFromStorage: function(cname) {
                isLocalStorageEnabled && localStorage[cname] && localStorage.removeItem(cname);
                this.getCookie(cname) && this.setCookie(cname, "", -1)
            }
        }
    }();
    pushAPI.referrerUtil = function() {
        var referrerUrl;
        return {
            updateReferrer: function() {
                pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "referrerUrl") || (referrerUrl = this.trimProtocol(document.referrer),
                referrerUrl.indexOf(this.trimProtocol(pushsenderConfig.selfHostedSubdomainUrl.toLowerCase())) == -1 && pushAPI.storageUtil.addToStorage(pushsenderConfig.prefix_tag + "referrerUrl", document.referrer, 2e3))
            },
            getReferrer: function() {
                return pushsenderConfig.selfSubscribeDomain != !1 ? pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "referrerUrl") : (referrerUrl = this.getUrlValue("referrer"),
                referrerUrl != "false" && referrerUrl != !1) ? referrerUrl : ""
            },
            trimProtocol: function(url) {
                return url.replace(/.*?:\/\//g, "")
            },
            getUrlValue: function(name) {
                var url = location.href;
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regexS = "[\\?&]" + name + "=([^&#]*)"
                  , regex = new RegExp(regexS)
                  , results = regex.exec(url);
                return results == null ? null : results[1]
            }
        }
    }();
    pushAPI.pushSubscription = function() {
        var isPushEnabled = !1;
        return {
            canPushBeEnabled: !0,
            serviceWorkerPath: "",
            isUserSubscriptionDenied: !1,
            websiteSafariPushId: "",
            browserType: "",
            initialiseState: function() {
                if (("showNotification"in ServiceWorkerRegistration.prototype))
                    return Notification.permission === "denied" ? void 0 : ("PushManager"in window) ? "showNotification"in ServiceWorkerRegistration.prototype ? "denied" === Notification.permission ? (pushAPI.pushSubscription.canPushBeEnabled = !1,
                    pushAPI.pushSubscription.isUserSubscriptionDenied = !0,
                    !1) : "PushManager"in window ? !0 : (pushAPI.pushSubscription.canPushBeEnabled = !1,
                    !1) : (pushAPI.pushSubscription.canPushBeEnabled = !1,
                    !1) : void 0
            },
            registerServiceWorker: function() {
                "serviceWorker"in navigator && navigator.serviceWorker.register(this.serviceWorkerPath).then(this.initialiseState)
            },
            detectBrowserType: function() {
                "safari"in window && window.safari && "pushNotification"in window.safari ? this.browserType = "safari" : "chrome"in window && window.chrome && "serviceWorker"in navigator ? this.browserType = "chrome" : /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent) && "serviceWorker"in navigator ? this.browserType = "firefox" : (this.browserType = "not-supported",
                this.canPushBeEnabled = !1)
            },
            detectSafariVersion: function() {
                return parseInt(navigator.userAgent.match(/Version\/(.*) /)[1])
            },
            subscribe: function(isApiCall) {
                var GetUnixTimeStamp = function() {
                    return Math.round((new Date).getTime() / 1e3)
                }
                  , addReplyToBody = function() {
                    var modal = '<div class="p4s-native-reply__background reply-modal-outer background-close-reply"><div class="p4s-native-reply__wrapper"><div class="p4s-native-reply__content"><div class="p4s-native-reply__title">' + pushsenderConfig.diplayConfig.Native.replySettings.title + '<\/div><div class="p4s-native-reply__text">' + pushsenderConfig.diplayConfig.Native.replySettings.text + '<\/div><div class="p4s-native-reply__image-container"><img src="' + pushsenderConfig.diplayConfig.Native.replySettings.imagePath + '" class="p4s-native-reply__image"><\/div><div class="p4s-native-reply__close"><svg class="close-reply" height="9pt" viewBox="0 0 9 9" width="9pt"><path d="m 5.9850028,4.5002882 2.784272,-2.7842761 c 0.3076336,-0.3076321 0.3076336,-0.8063761 0,-1.113528 L 8.3980964,0.2313 c -0.3077288,-0.307728 -0.8064795,-0.307728 -1.113632,0 L 4.5002884,3.0154801 1.7160162,0.230724 c -0.3076333,-0.307632 -0.80638344,-0.307632 -1.1135359,0 L 0.23072487,0.6019081 c -0.30763316,0.3077279 -0.30763316,0.8064719 0,1.113624 l 2.78475283,2.7847561 -2.78417602,2.78418 c -0.3077293,0.3077281 -0.3077293,0.8064718 0,1.1136238 L 0.6024803,8.769276 c 0.30763318,0.307632 0.8063834,0.307632 1.1135359,0 L 4.5002884,5.9850002 7.2844644,8.769276 c 0.3077294,0.307632 0.80648,0.307632 1.113632,0 L 8.7692748,8.398092 c 0.3076336,-0.307728 0.3076336,-0.8064717 0,-1.1136238 z m 0,0"><\/path><\/svg><\/div><\/div><\/div><\/div>';
                    document.body.insertAdjacentHTML("beforeend", modal);
                    setMyClickOn("click", ".close-reply", function() {
                        getMyElement(".reply-modal-outer") && getMyElement(".reply-modal-outer").remove()
                    });
                    setMyClickOn("click", ".background-close-reply", function() {
                        getMyElement(".reply-modal-outer") && getMyElement(".reply-modal-outer").remove()
                    })
                }
                  , promise = MyDeferred()
                  , isSafari = "safari"in window && "pushNotification"in window.safari;
                return isSafari && this.detectSafariVersion() < 16 ? this.safariSubscribe(promise) : (navigator.serviceWorker.ready.then(function(scopeServiceWorkerRegistration) {
                    navigator.serviceWorker.getRegistrations().then(function(workerRegistrations) {
                        for (var workerRegistration = null, url, subscribeHandler, i = 0; i < workerRegistrations.length; i++)
                            if ((document.location.origin + pushsenderConfig.swPath).startsWith(workerRegistrations[i].scope)) {
                                workerRegistration = workerRegistrations[i];
                                break
                            }
                        workerRegistration == null && (workerRegistration = scopeServiceWorkerRegistration);
                        pushsenderConfig.tooltips.nativeSubscription.display && pushAPI.helpNotification.Display();
                        pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "unick_sended") || (pushAPI.storageUtil.addToStorage(pushsenderConfig.prefix_tag + "unick_sended", 1),
                        url = "https://push4site.com/Sdk/WidgetDisplayed?siteToken=" + pushsenderConfig.hash + "&displayType=Native",
                        fetch(url));
                        subscribeHandler = function(e) {
                            e != null && e.preventDefault();
                            pushsenderConfig.subscriptionBackStatus != !0 || pushsenderConfig.tooltips.nativeSubscription.display || pushAPI.storageUtil.getFromStorage("last_diplay_dateNative") || changeMyProp("#p4sbackInfoDiv", "display", "block");
                            Notification.requestPermission().then(function(result) {
                                var p, stringToUint, key, last_display;
                                pushsenderConfig.subscriptionBackStatus != !0 || pushsenderConfig.tooltips.nativeSubscription.display || changeMyProp("#p4sbackInfoDiv", "display", "none");
                                result == "granted" ? (pushAPI.helpNotification.closeNotification(),
                                pushsenderConfig.FcmVapidPublicKey == null || pushAPI.pushSubscription.browserType == "firefox" ? p = workerRegistration.pushManager.subscribe({
                                    userVisibleOnly: !0
                                }) : (stringToUint = function(base64String) {
                                    var padding = "=".repeat((4 - base64String.length % 4) % 4)
                                      , base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")
                                      , rawData = window.atob(base64);
                                    return Uint8Array.from(rawData.split("").map(function(char) {
                                        return char.charCodeAt(0)
                                    }))
                                }
                                ,
                                key = stringToUint(pushsenderConfig.FcmVapidPublicKey),
                                p = workerRegistration.pushManager.subscribe({
                                    userVisibleOnly: !0,
                                    applicationServerKey: key
                                })),
                                p.then(function(subscription) {
                                    pushAPI.helpNotification.closeNotification();
                                    isPushEnabled = !0;
                                    promise.resolve(subscription)
                                })["catch"](function() {
                                    pushAPI.helpNotification.closeNotification();
                                    "denied" !== Notification.permission ? promise.resolve("error") : promise.resolve("denied")
                                })) : result == "denied" ? (last_display = pushAPI.storageUtil.getFromStorage("last_diplay_dateNative"),
                                last_display && pushsenderConfig.diplayConfig.Native.display && pushsenderConfig.diplayConfig.Native.replyEnabled && GetUnixTimeStamp() - last_display > pushsenderConfig.diplayConfig.Native.replyPeriod * 60 && (addReplyToBody(),
                                pushAPI.storageUtil.addToStorage("last_diplay_dateNative", GetUnixTimeStamp(), 2e3)),
                                last_display || pushAPI.storageUtil.addToStorage("last_diplay_dateNative", GetUnixTimeStamp(), 2e3),
                                pushAPI.helpNotification.closeNotification(),
                                promise.resolve("denied")) : (pushAPI.helpNotification.closeNotification(),
                                promise.resolve("error"))
                            })
                        }
                        ;
                        pushsenderConfig.diplayConfig.Native.display != !1 && (pushAPI.pushSubscription.browserType == "firefox" || pushAPI.pushSubscription.browserType == "safari") && Notification.permission != "denied" && !isApiCall ? setMyClickOn("click", "", subscribeHandler) : subscribeHandler(null)
                    })
                }),
                promise)
            },
            getUserSubscription: function(path) {
                var promise = MyDeferred(), isSafari = "safari"in window && "pushNotification"in window.safari, i;
                return isSafari && pushAPI.pushSubscription.detectSafariVersion() < 16 ? (i = window.safari.pushNotification.permission(pushsenderConfig.safariId),
                "granted" === i.permission && i.deviceToken ? promise.resolve(i) : promise.resolve(!1),
                promise) : (navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
                    serviceWorkerRegistration.pushManager.getSubscription().then(function(subscription) {
                        subscription ? (serviceWorkerRegistration.active.scriptURL && serviceWorkerRegistration.active.scriptURL.indexOf(path) == -1 && promise.resolve("needUnsubscribe"),
                        promise.resolve(subscription)) : promise.resolve(!1)
                    })["catch"](function() {
                        promise.resolve(!1)
                    })
                }),
                promise)
            },
            unsubscribe: function() {
                var promise = MyDeferred();
                return navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
                    serviceWorkerRegistration.pushManager.getSubscription().then(function(subscription) {
                        subscription || (isPushEnabled = !1,
                        promise.resolve("error"));
                        subscription.unsubscribe().then(function() {
                            isPushEnabled = !1;
                            promise.resolve(subscription)
                        })["catch"](function() {
                            promise.resolve("error")
                        })
                    })["catch"](function() {
                        promise.resolve("error")
                    })
                }),
                promise
            },
            safariSubscribe: function(e) {
                var subscribeHandler = function(x) {
                    x != null && x.preventDefault();
                    var n = this;
                    return "default" === window.safari.pushNotification.permission(pushsenderConfig.safariId).permission && window.safari.pushNotification.requestPermission("https://safari.push4site.com", pushsenderConfig.safariId, {}, function(t) {
                        "granted" === t.permission ? e.resolve(t) : "denied" === t.permission && e.resolve("denied")
                    }),
                    !1
                };
                pushsenderConfig.diplayConfig.Native.display == !1 ? subscribeHandler(null) : setMyClickOn("click", "", subscribeHandler)
            },
            registerForSafari: function() {
                return window.safari.pushNotification.permission(this.websiteSafariPushId)
            }
        }
    }();
    pushAPI.manageSubscription = function() {
        var syncServerURL = pushsenderConfig.serverSyncUrl
          , safariServerURL = pushsenderConfig.serverSyncUrl
          , firefoxEncryptionKey = "";
        return {
            doesUserResponseExists: !1,
            customerHash: "",
            callSyncSubscription: function(data, promise, action, subscriptionId, subscriptionEndPoint, subscriberId) {
                subscriberId != "" && (syncServerURL = pushsenderConfig.serverSyncUrlUpdate);
                var setPushSubscriptionStorage = function() {
                    "unsubscribe-ui" !== action && "unsubscribe-native" !== action && (pushAPI.storageUtil.addToStorage(pushsenderConfig.prefix_tag + "push_subscription_id", subscriptionId, 2e3),
                    pushAPI.storageUtil.addToStorage(pushsenderConfig.prefix_tag + "push_subscription_endpoint", subscriptionEndPoint, 2e3))
                    fetch('notify/checkNotify.php', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                };
                fetch(syncServerURL, {
                    method: "POST",
                    body: transformInToFormObject(data),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).then(function(response) {
                    return response.json()
                }).then(function(response) {
                    if (response.Success) {
                        var subscriptionEvent = new Event("user_subscribed.push4site");
                        subscriptionEvent.subscriberId = response.Id;
                        document.dispatchEvent(subscriptionEvent)
                    }
                    response.Success === !0 ? (response.hasOwnProperty("Id") && (pushAPI.storageUtil.addToStorage(pushsenderConfig.prefix_tag + "push_subscriber_id", response.Id, 2e3),
                    pushAPI.storageUtil.addToStorage(pushsenderConfig.prefix_tag + "push_db_status", "true", 2e3),
                    pushAPI.storageUtil.addToStorage(pushsenderConfig.prefix_tag + "push_subscription_status", "subscribed", 2e3)),
                    setPushSubscriptionStorage(),
                    promise.resolve("success")) : !1 === response.Success && (setPushSubscriptionStorage(),
                    pushAPI.storageUtil.addToStorage(pushsenderConfig.prefix_tag + "push_db_status", "false", 2e3),
                    promise.resolve("error"));
                    components.notification.toggleBellButtonText()
                }).catch(function() {
                    pushAPI.storageUtil.addToStorage(pushsenderConfig.prefix_tag + "push_db_status", "false", 2e3);
                    setPushSubscriptionStorage();
                    promise.resolve("error")
                })
            },
            syncSubscription: function(subscription, subscriberId, previousSubscriptionId, subscriptionId, subscriptionEndPoint, action) {
                var promise = MyDeferred(), language, encode_data, data;
                return subscriberId = subscriberId || "",
                language = pushAPI.getFirstBrowserLanguage(),
                "safari" === pushAPI.pushSubscription.browserType && pushAPI.pushSubscription.detectSafariVersion() < 16 ? (encode_data = JSON.parse(subscription),
                data = "SiteToken=" + pushsenderConfig.hash + "&SubscriberToken=" + subscriptionId + "&subscriberId=" + subscriberId + "&previousSubscriptionId=" + previousSubscriptionId + "&Browser=" + pushAPI.pushSubscription.browserType + "&Referrer=" + pushAPI.referrerUtil.getReferrer() + "&language=" + language + "&scriptVersion=" + pushsenderConfig.scriptVersion) : subscription != "" ? (encode_data = JSON.parse(subscription),
                data = "SiteToken=" + pushsenderConfig.hash + "&SubscriberToken=" + subscriptionId + "&subscriberId=" + subscriberId + "&previousSubscriptionId=" + previousSubscriptionId + "&Browser=" + pushAPI.pushSubscription.browserType + "&endpoint=" + subscriptionEndPoint + "&firefoxEncryptionKey=" + encodeURIComponent(firefoxEncryptionKey) + "&p256dh=" + encode_data.keys.p256dh.replace("+", "-").replace("/", "_") + "&auth=" + encode_data.keys.auth.replace("+", "-").replace("/", "_") + "&Referrer=" + pushAPI.referrerUtil.getReferrer() + "&language=" + language + "&scriptVersion=" + pushsenderConfig.scriptVersion) : (encode_data = JSON.parse(subscription),
                data = "SubscriberToken=" + subscriptionId + "&p256dh=" + encode_data.keys.p256dh + "&auth=" + encode_data.keys.auth + "&Referrer=" + pushAPI.referrerUtil.getReferrer() + "&language=" + language + "&scriptVersion=" + pushsenderConfig.scriptVersion),
                getMyElementsList("input[name=p4s_topic_id]:checked").forEach(function(el) {
                    data = data + "&topics=" + el.value
                }),
                pushAPI.manageSubscription.callSyncSubscription(data, promise, action, subscriptionId, subscriptionEndPoint, subscriberId),
                promise
            },
            updateSubscription: function(subscriptionDetails) {
                var promise = MyDeferred()
                  , subscription = this.splitSubscriptionParameters(subscriptionDetails)
                  , p4sPushDbStatus = pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_db_status")
                  , p4sPushSubscriberId = pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscriber_id")
                  , p4sPushSubscriptionId = pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscription_id")
                  , p4sPushSubscriptionEndpoint = pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscription_endpoint")
                  , subscriptionString = JSON.stringify(subscriptionDetails);
                return "false" === p4sPushDbStatus ? this.syncSubscription(subscriptionString, p4sPushSubscriberId, p4sPushSubscriptionId, subscription.subscriptionId, subscription.endpoint, "insert-failed").then(function(response) {
                    promise.resolve(response)
                }) : (p4sPushSubscriptionId === subscription.subscriptionId && "" === p4sPushSubscriberId && this.syncSubscription(subscriptionString, "", "", subscription.subscriptionId, subscription.endpoint, "get-subscriberid-from-server").then(function(response) {
                    promise.resolve(response)
                }),
                p4sPushSubscriptionId !== subscription.subscriptionId || p4sPushSubscriptionEndpoint !== subscription.endpoint ? "" === p4sPushSubscriptionId ? this.syncSubscription(subscriptionString, p4sPushSubscriberId, "", subscription.subscriptionId, subscription.endpoint, "update").then(function(response) {
                    promise.resolve(response)
                }) : this.syncSubscription(subscriptionString, p4sPushSubscriberId, p4sPushSubscriptionId, subscription.subscriptionId, subscription.endpoint, "update-google-registration-id").then(function(response) {
                    promise.resolve(response)
                }) : promise.resolve("already-updated")),
                promise
            },
            splitSubscriptionParameters: function(subscriptionDetails) {
                var endpointURL, endpoint, offset, subscriptionId, updatedSubscription;
                if ("error" !== subscriptionDetails && "denied" !== subscriptionDetails) {
                    if (endpointURL = "",
                    endpoint = "",
                    "safari" === pushAPI.pushSubscription.browserType && pushAPI.pushSubscription.detectSafariVersion() < 16)
                        return {
                            subscriptionId: subscriptionDetails.deviceToken,
                            endpoint: ""
                        };
                    if ("firefox" === pushAPI.pushSubscription.browserType)
                        offset = subscriptionDetails.endpoint.lastIndexOf("/"),
                        endpointURL = subscriptionDetails.endpoint.substring(0, offset),
                        endpoint = subscriptionDetails.endpoint;
                    else if (subscriptionDetails.endpoint.indexOf("https://fcm.googleapis.com/fcm/send") === 0)
                        endpointURL = "https://fcm.googleapis.com/fcm/send",
                        endpoint = subscriptionDetails.endpoint;
                    else {
                        if (subscriptionDetails.endpoint.indexOf("windows") > 0)
                            return endpointURL = subscriptionDetails.endpoint.split("=").slice(0, -1).join("/"),
                            subscriptionId = subscriptionDetails.endpoint.split("=").slice(-1)[0],
                            updatedSubscription = {},
                            updatedSubscription.subscriptionId = subscriptionId,
                            updatedSubscription.endpoint = endpointURL,
                            updatedSubscription;
                        if (subscriptionDetails.endpoint.indexOf("apple") > 0)
                            return endpointURL = subscriptionDetails.endpoint.split("/").slice(0, -1).join("/"),
                            subscriptionId = subscriptionDetails.endpoint.split("/").slice(-1)[0],
                            updatedSubscription = {},
                            updatedSubscription.subscriptionId = subscriptionId,
                            updatedSubscription.endpoint = endpointURL,
                            updatedSubscription;
                        endpointURL = "https://android.googleapis.com/gcm/send";
                        endpoint = subscriptionDetails.endpoint
                    }
                    if (0 === endpoint.indexOf(endpointURL + "/"))
                        return updatedSubscription = {},
                        updatedSubscription.subscriptionId = endpoint.replace(endpointURL + "/", ""),
                        updatedSubscription.endpoint = endpointURL,
                        "firefox" === pushAPI.pushSubscription.browserType && (firefoxEncryptionKey = btoa(String.fromCharCode.apply(null, new Uint8Array(subscriptionDetails.getKey("p256dh"))))),
                        updatedSubscription
                }
                return subscriptionDetails
            },
            setNewPushSubscriber: function(subscriptionDetails) {
                var promise = MyDeferred()
                  , response = this.splitSubscriptionParameters(subscriptionDetails);
                if ("error" !== response && "denied" !== response)
                    return (this.syncSubscription(JSON.stringify(subscriptionDetails), "", "", response.subscriptionId, response.endpoint, "insert").then(function(value) {
                        pushAPI.storageUtil.addToStorage(pushsenderConfig.prefix_tag + "push_subscription_status", "subscribed", 2e3);
                        promise.resolve(value)
                    }),
                    promise)
            },
            syncUnsubscribedUsers: function() {
                var promise = MyDeferred()
                  , p4sPushSubscriberId = pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscriber_id")
                  , p4sPushSubscriptionId = pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscription_id");
                return pushAPI.pushSubscription.initialiseState(),
                (!pushAPI.pushSubscription.isUserSubscriptionDenied || "" === p4sPushSubscriberId && "" === p4sPushSubscriptionId) && ("default" !== Notification.permission || "" === p4sPushSubscriberId && "" === p4sPushSubscriptionId) ? promise.resolve("default") : this.syncSubscription("", p4sPushSubscriberId, "", p4sPushSubscriptionId, "", "unsubscribe-native").then(function(value) {
                    promise.resolve(value)
                }),
                promise
            },
            isHttpSite: function() {
                return "https:" !== location.protocol && 0 !== location.host.indexOf("localhost") && 0 !== location.host.indexOf("127.0.0.1")
            },
            getSafariDeviceToken: function(permissionData) {
                "default" === permissionData.permission ? window.safari.pushNotification.requestPermission(safariServerURL, pushAPI.pushSubscription.websiteSafariPushId, {}, this.getSafariDeviceToken) : "denied" === permissionData.permission ? console.log("Safari Subscription Status - Denied") : "granted" === permissionData.permission && console.log("Safari Subscription Status - Granted")
            }
        }
    }();
    pushAPI = pushAPI || {};
    pushAPI.helpNotification = function() {
        return {
            Display: function() {
                var textAdd = "";
                pushsenderConfig.tooltips.nativeSubscription.display && pushsenderConfig.subscriptionBackStatus && (textAdd = '<div class="p4s-inner-content bottomBrandLink"><a class="p4s-copyright-link" target="_blank" href="https://push4site.com/poweredbyredirect/?utm_referrer=vastrp.ru&utm_source=widget">powered by Push<span class="logoLetter">4<\/span>site<\/a><\/div>');
                document.body.insertAdjacentHTML("beforeend", '<div class="v2-p4s-popup push_notification_popup" id="p4s-helper" style="display: none"><div class="v2-p4s-popup-overlay"><\/div><div class="v2-p4s-popup-content-info"><div class="v2-p4s-popup-text-info">' + pushsenderConfig.tooltips.nativeSubscription.text + "<\/div><\/div>" + textAdd + "<\/div>");
                setMyClickOn("click", "#p4s-helper", function() {
                    pushAPI.helpNotification.closeNotification()
                });
                setTimeout(function() {
                    changeMyProp("#p4s-helper", "display", "block")
                }, pushsenderConfig.tooltips.nativeSubscription.delay)
            },
            closeNotification: function() {
                myFadeOut("#p4s-helper", 500)
            }
        }
    }();
    pushAPI.InitSubscription = function() {}();
    var components, APIReadyState = {
        UNINITIALIZED: !1,
        READY: !0,
        FAILED: 2
    }, _pushsender = {}, pushsender = {
        isAPIReady: APIReadyState.UNINITIALIZED
    };
    !function() {
        var childWindowURL, storageUtil, countChild, $document, is_notification_viewed, localizationUtil;
        storageUtil = pushAPI.storageUtil;
        localizationUtil = pushAPI.localizationUtil;
        $document = document;
        countChild = 0;
        is_notification_viewed = !1;
        childWindowURL = "1" == pushsenderConfig.subdomainFlag ? pushsenderConfig.selfHostedSubdomainUrl : "https://" + pushsenderConfig.subdomain + "." + pushsenderConfig.serverSyncUrl.replace(/.*?:\/\//g, "");
        components = {
            notification: {
                toggleBellButtonText: function() {
                    var subscriberId = pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscriber_id"), buttonText;
                    buttonText = subscriberId ? pushsenderConfig.diplayConfig.Bell.unsubscribeText : pushsenderConfig.diplayConfig.Bell.subscribeText;
                    SetMyElementHtml("#p4s_toggle_subscription span", buttonText)
                },
                unsubscribe: function() {
                    var url = pushsenderConfig.unsubscribeUrl + "?subscriberId=" + pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscriber_id");
                    fetch(url);
                    pushAPI.storageUtil.deleteFromStorage(pushsenderConfig.prefix_tag + "push_subscriber_id");
                    pushAPI.storageUtil.deleteFromStorage(pushsenderConfig.prefix_tag + "push_subscription_status");
                    pushAPI.storageUtil.deleteFromStorage(pushsenderConfig.prefix_tag + "push_subscription_id");
                    pushAPI.storageUtil.deleteFromStorage(pushsenderConfig.prefix_tag + "push_uid");
                    pushAPI.storageUtil.deleteFromStorage(pushsenderConfig.prefix_tag + "push_subscription_endpoint");
                    navigator.serviceWorker && navigator.serviceWorker.getRegistrations().then(function(registrations) {
                        for (var registration in registrations)
                            registrations[registration].unregister()
                    });
                    components.notification.toggleBellButtonText()
                },
                closeNotificationPopup: function() {
                    myFadeOut(".push_notification_popup", 500)
                },
                closeDesignerPopup: function() {
                    myFadeOut(".push_designer_popup", 500)
                },
                closeRingModal: function() {
                    myFadeOut(".p4s-button", 500)
                },
                closeNotificationDialog: function() {
                    myFadeOut("#p4s-confirm-widget", 500)
                },
                notificationShowUpClick: function() {
                    if (!pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "unick_sended")) {
                        pushAPI.storageUtil.addToStorage(pushsenderConfig.prefix_tag + "unick_sended", 1);
                        var url = "https://push4site.com/Sdk/WidgetDisplayed?siteToken=" + pushsenderConfig.hash + "&displayType=" + pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "display_method");
                        fetch(url)
                    }
                },
                notificationShowUp: function(displayType) {
                    var timeFromFirstVisit, pagesDisplayCount, displayCount, url;
                    timeFromFirstVisit = Math.round((new Date).getTime() / 1e3) - pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "first_visit") * 1;
                    pagesDisplayCount = storageUtil.getFromStorage("page_view_count");
                    displayCount = pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "unick_sended");
                    timeFromFirstVisit >= pushsenderConfig.sendDisplayInfoTiming || pagesDisplayCount >= pushsenderConfig.sendDisplayInfoPages ? displayCount < 1 && (pushAPI.storageUtil.addToStorage(pushsenderConfig.prefix_tag + "unick_sended", 1),
                    url = "https://push4site.com/Sdk/WidgetDisplayed?siteToken=" + pushsenderConfig.hash + "&displayType=" + displayType,
                    fetch(url)) : (timeFromFirstVisit < pushsenderConfig.sendDisplayInfoTiming && window.setTimeout(function() {
                        components.notification.notificationShowUpClick()
                    }, (pushsenderConfig.sendDisplayInfoTiming - timeFromFirstVisit) * 1e3),
                    pushAPI.storageUtil.addToStorage(pushsenderConfig.prefix_tag + "display_method", displayType))
                },
                notificationPopup: function(isApiCall) {
                    var poweredBy, poweredByMobile, topicsClass, topicsHtml, m;
                    if (pushsenderConfig.diplayConfig.Button.display == !0 && (addMyClass(".p4s-button", "p4s-button--text p4s-button--" + pushsenderConfig.diplayConfig.Button.color),
                    addMyClass(".p4s-button", "pushsender-btn-allow"),
                    SetMyElementHtml(".p4s-button", pushsenderConfig.diplayConfig.Button.text),
                    changeMyProp(".p4s-button", "display", "inline-block"),
                    this.initCloseNotifications()),
                    pushsenderConfig.diplayConfig.PopUp.display == !0 && is_notification_viewed == !1)
                        return is_notification_viewed = !0,
                        components.notification.notificationShowUp("Popup"),
                        pushsenderConfig.diplayConfig.PopUp.display = !1,
                        '<div class="v2-p4s-popup push_notification_popup" id="p4s-popup"><div class="v2-p4s-popup-overlay"><\/div><div class="v2-p4s-popup-content"><div class="v2-p4s-popup-img"><img src="' + pushsenderConfig.diplayConfig.PopUp.image + '" alt=""><\/div><div class="v2-p4s-popup-title">' + pushsenderConfig.diplayConfig.PopUp.title + '<\/div><div class="v2-p4s-popup-text">' + pushsenderConfig.diplayConfig.PopUp.text + '<\/div><div id="p4s-popup__subscribe" class="v2-p4s-popup__button pushsender-btn-allow">' + localizationUtil.GetLocalization("Subscribe") + '<\/div><div class="v2-p4s-popup-close"><a id="p4s-popup__close" class="v2-p4s-popup__close close-popup-modal">×<\/a><\/div><\/div><\/div>';
                    if (pushsenderConfig.diplayConfig.Designer.display == !0 && is_notification_viewed == !1)
                        return is_notification_viewed = !0,
                        components.notification.notificationShowUp("Designer"),
                        poweredBy = "",
                        poweredByMobile = "",
                        pushsenderConfig.HidePoweredBy || (poweredBy = 'Powered by <a href="https://push4site.com/poweredbyredirect/" target="_blank" class="p4s-designer__link">Push4site<\/a>'),
                        '<div class="p4s-designer push_designer_popup p4s-designer__' + pushsenderConfig.diplayConfig.Designer.position + '"><div class="p4s-designer__illustration"><img src="' + pushsenderConfig.diplayConfig.Designer.image + '" alt="illustration" class="p4s-designer__illustration-image"><\/div><img src="' + pushsenderConfig.diplayConfig.Designer.image2 + '" alt="designer" class="p4s-designer__image"><h3 class="p4s-designer__title">' + pushsenderConfig.diplayConfig.Designer.title + '<\/h3><div class="p4s-designer__desc">' + pushsenderConfig.diplayConfig.Designer.text + '<\/div><div class="p4s-designer__controls"><div class="p4s-designer__control-item"><a style="background-color:' + pushsenderConfig.diplayConfig.Designer.buttonColor + " !important; border-color: " + pushsenderConfig.diplayConfig.Designer.buttonColor + " !important; color:" + pushsenderConfig.diplayConfig.Designer.buttonTextColor + ' !important;" class="p4s-designer__control pushsender-btn-allow p4s-designer__control--width_full">' + localizationUtil.GetLocalization("Subscribe") + '<\/a><\/div><div class="p4s-designer__control-item"><a class="p4s-designer__control close-popup-designer p4s-designer__control--type_light p4s-designer__control--width_full">' + localizationUtil.GetLocalization("Cancel") + '<\/a><\/div><\/div><div class="p4s-designer__footer">' + poweredBy + "<\/div><\/div>";
                    if (pushsenderConfig.diplayConfig.Native.display == !0 && is_notification_viewed == !1 && (is_notification_viewed = !0,
                    document.dispatchEvent(new Event("initSubscription",{
                        isApiCall: isApiCall
                    }))),
                    pushsenderConfig.diplayConfig.Dialog.display == !0 && is_notification_viewed == !1) {
                        if (is_notification_viewed = !0,
                        components.notification.notificationShowUp("Dialog"),
                        poweredBy = "",
                        poweredByMobile = "",
                        pushsenderConfig.HidePoweredBy || (poweredBy = '<div class="v2-p4s-confirm__copyright v2-p4s-confirm__copyright--type_desktop">Powered by <a href="https://push4site.com/poweredbyredirect/" target="_blank" class="v2-p4s-confirm__link">Push4site<\/a><\/div>',
                        poweredByMobile = '<div class="v2-p4s-confirm__copyright v2-p4s-confirm__copyright--type_mobile">Powered by <a href="https://push4site.com/poweredbyredirect/" class="v2-p4s-confirm__link">Push4site<\/a><\/div>'),
                        topicsClass = "",
                        topicsHtml = "",
                        pushsenderConfig.diplayConfig.Topics.length > 0) {
                            for (topicsClass = "v2-p4s-confirm-large",
                            topicsHtml = '<div class="v2-p4s-confirm-topics-container">',
                            m = 0; m < pushsenderConfig.diplayConfig.Topics.length; m++)
                                topicsHtml += '<label class="v2-p4s-topic-wrapper"><input type="checkbox" name="p4s_topic_id" value="' + pushsenderConfig.diplayConfig.Topics[m].id + '" checked class="v2-p4s-topic-checkbox"><span class="v2-p4s-topic-label" style="--checkbox-background: ' + pushsenderConfig.diplayConfig.Dialog.color + ';">' + pushsenderConfig.diplayConfig.Topics[m].title + "<\/span><\/label>";
                            topicsHtml += "<\/div>"
                        }
                        return '<div id="p4s-confirm-widget" class="v2-p4s-confirm__container v2-p4s-confirm-' + pushsenderConfig.diplayConfig.Dialog.position + " " + topicsClass + '"><div class="v2-p4s-confirm"><div class="v2-p4s-confirm__aside"><img src="' + pushsenderConfig.iconUrl + '" class="v2-p4s-confirm__image">' + poweredBy + '<\/div><div class="v2-p4s-confirm__content"><h2 class="v2-p4s-confirm__title">' + pushsenderConfig.diplayConfig.Dialog.mainText + '<\/h2><div class="v2-p4s-confirm__desc">' + pushsenderConfig.diplayConfig.Dialog.aditionalText + "<\/div><\/div>" + topicsHtml + '<div class="v2-p4s-confirm__controls"><div class="v2-p4s-confirm__control-item"><input id="p4s-confirm-block-button" type="button" value="' + localizationUtil.GetLocalization("Cancel") + '" class="v2-p4s-confirm__control v2-p4s-confirm__control--width_full pushsender-btn-close"><\/div><div class="v2-p4s-confirm__control-item"><a id="p4s-confirm-allow-button"  class="v2-p4s-confirm__control v2-p4s-confirm__control--width_full v2-p4s-confirm__control--style_primary pushsender-btn-allow" style="color:' + pushsenderConfig.diplayConfig.Dialog.buttonColor + "; background-color: " + pushsenderConfig.diplayConfig.Dialog.color + ';">' + localizationUtil.GetLocalization("Subscribe") + "<\/a><\/div><\/div>" + poweredByMobile + "<\/div><\/div>"
                    }
                    return ""
                },
                initCloseNotifications: function() {
                    getMyElementsList(".pushsender-btn-allow, #pushsender-mobile_allow_button").forEach(function(availableElements) {
                        availableElements.addEventListener("click", function() {
                            components.notification.notificationShowUpClick();
                            components.notification.closeNotificationDialog();
                            components.notification.closeNotificationPopup();
                            components.notification.closeDesignerPopup();
                            components.notification.closeRingModal()
                        })
                    });
                    getMyElementsList(".close-popup-modal").forEach(function(availableElements) {
                        availableElements.addEventListener("click", function() {
                            storageUtil.addToStorage(pushsenderConfig.prefix_tag + "push_do_not_show_notification_popup", "true", 2e3);
                            components.notification.closeNotificationPopup()
                        })
                    });
                    getMyElementsList(".close-popup-designer").forEach(function(availableElements) {
                        availableElements.addEventListener("click", function() {
                            storageUtil.addToStorage(pushsenderConfig.prefix_tag + "push_do_not_show_notification_designer", "true", 2e3);
                            components.notification.closeDesignerPopup()
                        })
                    });
                    getMyElementsList(".pushsender-btn-close").forEach(function(availableElements) {
                        availableElements.addEventListener("click", function() {
                            storageUtil.addToStorage(pushsenderConfig.prefix_tag + "push_do_not_show_notification_Dialog", "true", 2e3);
                            components.notification.notificationShowUpClick();
                            components.notification.closeNotificationDialog()
                        })
                    })
                },
                showBell: function() {
                    setTimeout(function() {
                        var subscriberId = pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscriber_id"), buttonText, html;
                        subscriberId ? buttonText = pushsenderConfig.diplayConfig.Bell.unsubscribeText : (components.notification.notificationShowUp("Bell"),
                        buttonText = pushsenderConfig.diplayConfig.Bell.subscribeText);
                        html = '<div class="page__p4s_sbs-panel"><div class="p4s_sbs-panel"><div style="background-color:' + pushsenderConfig.diplayConfig.Bell.buttonColor + '" class="p4s_sbs-panel__trigger" onclick="var panel=document.querySelector(\'.p4s_sbs-panel\');panel.classList.toggle(\'p4s_sbs-panel_tooltip_open\');"><svg style="fill:' + pushsenderConfig.diplayConfig.Bell.buttonTextColor + '" class="p4s_sbs-panel__icon" viewBox="0 0 32 40" height="40" width="32"><path d="M16.3043 39.2558C17.9638 39.2551 19.3095 37.9108 19.3111 36.2513C19.3111 35.866 19.2402 35.4332 19.1195 35.1763H13.4905C13.3704 35.4332 13.2979 35.875 13.2979 36.257C13.3012 37.9148 14.6466 39.2568 16.3043 39.2558Z"><\/path> <path d="M31.5981 32.0491C30.7953 31.5018 30.136 30.7693 29.6757 29.9136C28.6749 28.004 26.9954 23.9154 26.9954 17.9824C26.9954 15.2281 25.8293 12.426 23.7959 10.2943C21.7444 8.14379 19.0136 6.91016 16.3038 6.91016C13.594 6.91016 10.8635 8.14412 8.81201 10.296C6.77859 12.4284 5.61219 15.2315 5.61219 17.9857C5.61219 24.2967 3.76609 28.4275 2.66559 30.3284C2.26018 31.0131 1.71194 31.6025 1.05833 32.0564C1.01551 32.0865 0.975036 32.1197 0.937572 32.1565C0.725835 32.3776 0.607756 32.6723 0.607422 32.9783C0.607422 33.6109 1.12222 34.1491 1.731 34.1491H30.8766C31.4857 34.1491 32.0001 33.6109 32.0001 32.9783C32.0001 32.6823 31.8817 32.3113 31.7412 32.1708C31.6971 32.1264 31.6493 32.0855 31.5981 32.0491Z"><\/path> <path d="M18.8599 3.31258C18.8599 1.8943 17.7152 0.744629 16.3033 0.744629C14.8917 0.744629 13.7471 1.8943 13.7471 3.31258C13.7471 4.73052 14.8917 5.88019 16.3033 5.88019C17.7152 5.88019 18.8599 4.73052 18.8599 3.31258Z"><\/path><\/svg><\/div><div class="p4s_sbs-panel__tooltip"><img src="https://push4site.com/images/widgets/tail.svg" class="p4s_sbs-panel__tooltip-tail"/><div class="p4s_sbs-panel__content"><div class="p4s_sbs-panel__title">' + pushsenderConfig.diplayConfig.Bell.tooltipText + '<\/div><div class="p4s_sbs-panel__illustration"><img src="https://push4site.com/images/widgets/bell_push.svg" class="p4s_sbs-panel__image" title="" /><\/div><div class="p4s_sbs-panel__controls"><div class="p4s_sbs-panel__control" id="p4s_toggle_subscription"><span class="p4s_sbs-panel__control-panel" style="color:' + pushsenderConfig.diplayConfig.Bell.buttonTextColor + ";background-color:" + pushsenderConfig.diplayConfig.Bell.buttonColor + '">' + buttonText + "<\/span><\/div><\/div><\/div><\/div><\/div><\/div>";
                        document.body.insertAdjacentHTML("beforeend", html);
                        getMyElementsList("#p4s_toggle_subscription").forEach(function(availableElements) {
                            availableElements.addEventListener("click", function() {
                                var panel = getMyElement(".p4s_sbs-panel"), subscriberId;
                                panel.classList.remove("p4s_sbs-panel_tooltip_open");
                                subscriberId = pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscriber_id");
                                subscriberId ? components.notification.unsubscribe() : document.dispatchEvent(new Event("initSubscription",{
                                    isApiCall: !1
                                }))
                            })
                        })
                    }, 2e3)
                }
            }
        }
    }();
    _utils = {},
    function() {
        var storageUtil, childWindowURL;
        storageUtil = pushAPI.storageUtil;
        childWindowURL = "1" == pushsenderConfig.subdomainFlag ? pushsenderConfig.selfHostedSubdomainUrl : "https://" + pushsenderConfig.subdomain + "." + pushsenderConfig.serverSyncUrl.replace(/.*?:\/\//g, "");
        _utils.validString = function(value) {
            return /^[A-Za-z0-9_-]*$/.test(value)
        }
        ;
        _pushsender.initPopup = function(isApiCall) {
            if (!storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscription_id")) {
                var notification = components.notification;
                let info = notification.notificationPopup(isApiCall);
                document.body.insertAdjacentHTML("beforeend", info);
                info != "" && notification.initCloseNotifications()
            }
        }
        ;
        _pushsender.APIReady = function(callback) {
            callback()
        }
        ;
        _pushsender.initAPIValues = function() {
            pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "first_visit") || pushAPI.storageUtil.addToStorage(pushsenderConfig.prefix_tag + "first_visit", (new Date).getTime() / 1e3);
            var subscriberId = pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscriber_id") || !1;
            pushsender.setName = function(name) {
                var nameSet = pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "name_set"), subscriberId, url;
                if (nameSet)
                    return "Name is already set";
                if (subscriberId = pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscriber_id"),
                !subscriberId)
                    return "The user is not subscribed for notifications";
                url = "https://push4site.com/Subscriber/SetName?subscriberId=" + subscriberId + "&name=" + name;
                try {
                    fetch(url);
                    pushAPI.storageUtil.addToStorage(pushsenderConfig.prefix_tag + "name_set", !0, 2e3)
                } catch (e) {
                    return e
                }
                return !0
            }
            ;
            pushsender.isNameSet = function() {
                var nameSet = pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "name_set");
                return nameSet ? !0 : !1
            }
        }
    }();
    onReadyStateChange = function() {
        var head, link, cssUrl, storageUtil, childWindowURL, bitrixBasket, Integration, eventsApi, isChromeSupported, isFirefoxSupported, isSafariSupported;
        if (document.readyState == "complete") {
            if (window.pushsender)
                return;
            function InitTranslate() {
                var ViewPushText = pushAPI.localizationUtil.GetLocalization("ViewPushText")
                  , PushDisable = pushAPI.localizationUtil.GetLocalization("PushDisable");
                getMyElement(".push_display_tit").length > 0 && (getMyElement(".push_display_tit").innerHTML = ViewPushText,
                getMyElement("#unsubscribeText").innerHTML = PushDisable)
            }
            function initFbMessenger() {
                var head = document.getElementsByTagName("head")[0]
                  , link = document.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = MessengerConfig.cssFixUrl;
                head.appendChild(link);
                link.onload = function() {
                    document.body.insertAdjacentHTML("beforeend", '<div style="position:fixed;right:10px;bottom:10px;" class="fb-customerchat" theme_color="' + MessengerConfig.theme_color + '" page_id="' + MessengerConfig.page_id + '"><\/div>');
                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = MessengerConfig.fb_sdk;
                    document.getElementsByTagName("body")[0].appendChild(script);
                    document.body.insertAdjacentHTML("beforeend", MessengerConfig.fb_init)
                }
            }
            function getHostName(data) {
                var a = document.createElement("a");
                return a.href = data,
                a.hostname
            }
            function isOnSubdomain() {
                var currentLocation = trimProtocol(document.location.href.toLowerCase());
                return currentLocation.indexOf(trimProtocol(pushsenderConfig.selfHostedSubdomainUrl.toLowerCase())) != -1 ? !1 : !0
            }
            function trimProtocol(url) {
                return url.replace(/.*?:\/\//g, "")
            }
            function GetPageViewCount() {
                var view_count = storageUtil.getFromStorage("page_view_count");
                return view_count || (view_count = 0),
                view_count++,
                storageUtil.addToStorage("page_view_count", view_count, 2e3),
                view_count
            }
            function GetLastDisplayNotification(type) {
                var last_display = storageUtil.getFromStorage("last_diplay_date" + type);
                return last_display ? last_display : 0
            }
            function GetUnixTimeStamp() {
                return Math.round((new Date).getTime() / 1e3)
            }
            function SetLastDisplayNotification(type) {
                storageUtil.addToStorage("last_diplay_date" + type, GetUnixTimeStamp(), 2e3)
            }
            function ClearPageViewCount() {
                storageUtil.addToStorage("page_view_count", 0, 2e3)
            }
            function IsLabelEnabled() {
                if (!pushsenderConfig.diplayConfig.Label.display || "true" == storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_do_not_show_notification_label") && GetUnixTimeStamp() - GetLastDisplayNotification("label") < pushsenderConfig.diplayConfig.Label.replyPeriod * 60)
                    return !1;
                if (pushsenderConfig.diplayConfig.Label.display)
                    pushsenderConfig.diplayConfig.Label.displayParam == "delay" ? pushsender.display_delay_period = pushsenderConfig.diplayConfig.Label.delayTime : pushsenderConfig.diplayConfig.Label.displayParam == "scroll" ? pushsender.display_event_scroll_listener = pushsenderConfig.diplayConfig.Label.scrollPosition : pushsenderConfig.diplayConfig.Label.displayParam == "mouseOut" && (pushsender.display_event_mouse_listener = !0);
                else
                    return !1;
                return SetLastDisplayNotification("label"),
                storageUtil.addToStorage(pushsenderConfig.prefix_tag + "push_do_not_show_notification_label", "false", 2e3),
                !0
            }
            function IsBellEnabled() {
                return pushsenderConfig.diplayConfig.Bell.display ? !0 : !1
            }
            function IsNativeEnabled() {
                if (!pushsenderConfig.diplayConfig.Native.display)
                    return !1;
                if (pushsenderConfig.diplayConfig.Native.display) {
                    if (pushsenderConfig.diplayConfig.Native.displayParam == "delay")
                        pushsender.display_delay_period = pushsenderConfig.diplayConfig.Native.delayTime;
                    else if (pushsenderConfig.diplayConfig.Native.displayParam == "scroll")
                        pushsender.display_event_scroll_listener = pushsenderConfig.diplayConfig.Native.scrollPosition;
                    else if (pushsenderConfig.diplayConfig.Native.displayParam == "mouseOut")
                        pushsender.display_event_mouse_listener = !0;
                    else if (pushsenderConfig.diplayConfig.Native.displayParam == "viewDept") {
                        if (pushsender.page_view_count < pushsenderConfig.diplayConfig.Native.viewCount)
                            return !1;
                        ClearPageViewCount()
                    }
                } else
                    return !1;
                return storageUtil.addToStorage(pushsenderConfig.prefix_tag + "push_do_not_show_notification_native", "false", 2e3),
                !0
            }
            function IsDialogEnabled() {
                if (!pushsenderConfig.diplayConfig.Dialog.display || "true" == storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_do_not_show_notification_Dialog") && GetUnixTimeStamp() - GetLastDisplayNotification("Dialog") < pushsenderConfig.diplayConfig.Dialog.replyPeriod * 60)
                    return !1;
                if (pushsenderConfig.diplayConfig.Dialog.display) {
                    if (pushsenderConfig.diplayConfig.Dialog.displayParam == "delay")
                        pushsender.display_delay_period = pushsenderConfig.diplayConfig.Dialog.delayTime;
                    else if (pushsenderConfig.diplayConfig.Dialog.displayParam == "scroll")
                        pushsender.display_event_scroll_listener = pushsenderConfig.diplayConfig.Dialog.scrollPosition;
                    else if (pushsenderConfig.diplayConfig.Dialog.displayParam == "mouseOut")
                        pushsender.display_event_mouse_listener = !0;
                    else if (pushsenderConfig.diplayConfig.Dialog.displayParam == "viewDept") {
                        if (pushsender.page_view_count < pushsenderConfig.diplayConfig.Dialog.viewCount)
                            return !1;
                        ClearPageViewCount()
                    }
                } else
                    return !1;
                return SetLastDisplayNotification("Dialog"),
                storageUtil.addToStorage(pushsenderConfig.prefix_tag + "push_do_not_show_notification_Dialog", "false", 2e3),
                !0
            }
            function IsPopupEnabled() {
                if (!pushsenderConfig.diplayConfig.PopUp.display || "true" == storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_do_not_show_notification_popup") && GetUnixTimeStamp() - GetLastDisplayNotification("Popup") < pushsenderConfig.diplayConfig.PopUp.replyPeriod * 60)
                    return !1;
                if (pushsenderConfig.diplayConfig.PopUp.display) {
                    if (pushsenderConfig.diplayConfig.PopUp.displayParam == "delay")
                        pushsender.display_delay_period = pushsenderConfig.diplayConfig.PopUp.delayTime;
                    else if (pushsenderConfig.diplayConfig.PopUp.displayParam == "scroll")
                        pushsender.display_event_scroll_listener = pushsenderConfig.diplayConfig.PopUp.scrollPosition;
                    else if (pushsenderConfig.diplayConfig.PopUp.displayParam == "mouseOut")
                        pushsender.display_event_mouse_listener = !0;
                    else if (pushsenderConfig.diplayConfig.PopUp.displayParam == "viewDept") {
                        if (pushsender.page_view_count < pushsenderConfig.diplayConfig.PopUp.viewCount)
                            return !1;
                        ClearPageViewCount()
                    }
                } else
                    return !1;
                return SetLastDisplayNotification("Popup"),
                storageUtil.addToStorage(pushsenderConfig.prefix_tag + "push_do_not_show_notification_popup", "false", 2e3),
                !0
            }
            function IsDesignerEnabled() {
                if (!pushsenderConfig.diplayConfig.Designer.display || "true" == storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_do_not_show_notification_designer") && GetUnixTimeStamp() - GetLastDisplayNotification("Designer") < pushsenderConfig.diplayConfig.Designer.replyPeriod * 60)
                    return !1;
                if (pushsenderConfig.diplayConfig.Designer.display) {
                    if (pushsenderConfig.diplayConfig.Designer.displayParam == "delay")
                        pushsender.display_delay_period = pushsenderConfig.diplayConfig.Designer.delayTime;
                    else if (pushsenderConfig.diplayConfig.Designer.displayParam == "scroll")
                        pushsender.display_event_scroll_listener = pushsenderConfig.diplayConfig.Designer.scrollPosition;
                    else if (pushsenderConfig.diplayConfig.Designer.displayParam == "mouseOut")
                        pushsender.display_event_mouse_listener = !0;
                    else if (pushsenderConfig.diplayConfig.Designer.displayParam == "viewDept") {
                        if (pushsender.page_view_count < pushsenderConfig.diplayConfig.Designer.viewCount)
                            return !1;
                        ClearPageViewCount()
                    }
                } else
                    return !1;
                return SetLastDisplayNotification("Designer"),
                storageUtil.addToStorage(pushsenderConfig.prefix_tag + "push_do_not_show_notification_designer", "false", 2e3),
                !0
            }
            function GetSubscriberId(str) {
                for (var char, hash = 0, i = 0; i < str.length; i++)
                    char = str.charCodeAt(i),
                    hash = char + (hash << 6) + (hash << 16) - hash,
                    hash = hash & hash;
                return hash
            }
            function initPushNotifications() {
                pushsender.page_view_count = GetPageViewCount();
                pushsender.last_display_time = GetLastDisplayNotification();
                pushsender.display_delay_period = !1;
                pushsender.display_event_mouse_listener = !1;
                pushsender.display_event_scroll_listener = !1;
                storageUtil.addToStorage("IsDislogViewed", "false", 2e3);
                pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "display_method") && components.notification.notificationShowUp(pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "display_method"));
                pushsenderConfig.diplayConfig.PopUp.display && (pushsenderConfig.diplayConfig.PopUp.display = IsPopupEnabled());
                pushsenderConfig.diplayConfig.Dialog.display && (pushsenderConfig.diplayConfig.Dialog.display = IsDialogEnabled());
                pushsenderConfig.diplayConfig.Native.display && (pushsenderConfig.diplayConfig.Native.display = IsNativeEnabled());
                pushsenderConfig.diplayConfig.Designer.display && (pushsenderConfig.diplayConfig.Designer.display = IsDesignerEnabled());
                pushsenderConfig.diplayConfig.Label.display && (pushsenderConfig.diplayConfig.Label.display = IsLabelEnabled());
                pushsenderConfig.diplayConfig.Bell.display && (pushsenderConfig.diplayConfig.Bell.display = IsBellEnabled());
                pushsender.display_delay_period != !1 ? window.setTimeout(function() {
                    _pushsender.initPopup()
                }, pushsender.display_delay_period * 1e3) : pushsender.display_event_mouse_listener != !1 ? window.setTimeout(function() {
                    document.addEventListener("mouseleave", function() {
                        _pushsender.initPopup()
                    })
                }, 1e3) : pushsender.display_event_scroll_listener != !1 ? document.addEventListener("scroll", function() {
                    var document_height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight)
                      , viewport_height = window.innerHeight
                      , scroll = window.scrollY;
                    scroll == 0 && pushsender.display_event_scroll_listener == "header" && _pushsender.initPopup();
                    scroll + viewport_height >= document_height && pushsender.display_event_scroll_listener == "footer" && _pushsender.initPopup();
                    scroll + viewport_height / 2 > document_height / 2 && pushsender.display_event_scroll_listener == "middle" && _pushsender.initPopup()
                }) : _pushsender.initPopup()
            }
            pushsender.initSubscription = function() {
                _pushsender.initPopup(!0)
            }
            ;
            pushsender.unsubscribe = components.notification.unsubscribe;
            pushsender.isSubscribed = function() {
                var subscriberId = pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscriber_id");
                return subscriberId ? !0 : !1
            }
            ;
            pushsender.getSubscriberId = function() {
                var subscriberId = pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscriber_id");
                return subscriberId ? subscriberId : undefined
            }
            ;
            function osTest() {
                var ua = navigator.userAgent, clientStrings = [{
                    s: "windows",
                    r: /(Windows)/
                }, {
                    s: "windows",
                    r: /(Win 9x 4.90|Windows ME)/
                }, {
                    s: "macos",
                    r: /Mac OS X/
                }, {
                    s: "macos",
                    r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
                }, {
                    s: "linus",
                    r: /UNIX/
                }], id, cs;
                for (id in clientStrings)
                    if (cs = clientStrings[id],
                    cs.r.test(ua))
                        return cs.s;
                return !1
            }
            function getChromeVersion() {
                var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
                return raw ? parseInt(raw[2], 10) : !1
            }
            function addBackDiv() {
                var browserName = browserType().name
                  , Os = osTest();
                Os && browserName && pushsenderConfig.subscriptionBackStatus == !0 && !pushsenderConfig.tooltips.nativeSubscription.display && (browserName == "opera" || browserName == "yandex" || browserName == "firefox" || browserName == "chrome") && getMyElement("#p4sbackInfoDiv") && document.body.insertAdjacentHTML("beforeend", pushsenderConfig.subscriptionBackProto.replace("{OS}", Os).replace("{BROWSER}", browserName))
            }
            function browserType() {
                var tem, ua = navigator.userAgent, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [], isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                return /trident/i.test(M[1]) ? (tem = /\brv[ :]+(\d+)/g.exec(ua) || [],
                {
                    name: "IE"
                }) : "Chrome" === M[1] && (tem = ua.match(/\bOPR\/(\d+)/),
                null != tem) ? {
                    name: "opera"
                } : "Chrome" === M[1] && (tem = ua.match(/\bYaBrowser\/(\d+)/),
                null != tem) ? {
                    name: "yandex"
                } : (M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"],
                null != (tem = ua.match(/version\/(\d+)/i)) && M.splice(1, 1, tem[1]),
                isiOS && (M[0] = "iOS"),
                M[0] = M[0].toLowerCase(),
                {
                    name: M[0]
                })
            }
            function initPushNotificationsSubscription(isApiCall) {
                var manageSubscription, pushSubscription, timestamp, promise;
                if (manageSubscription = pushAPI.manageSubscription,
                pushSubscription = pushAPI.pushSubscription,
                InitTranslate(),
                pushsenderConfig.FcmVapidPublicKey == null && (timestamp = Date.now(),
                document.head.insertAdjacentHTML("beforeend", '<link rel="manifest" href="' + pushsenderConfig.manifestUrl + "?t=" + timestamp + '">')),
                manageSubscription.customerHash = pushsenderConfig.hash,
                pushSubscription.serviceWorkerPath = pushsenderConfig.swPath,
                pushSubscription.detectBrowserType(),
                "chrome"in window && "serviceWorker"in navigator && getChromeVersion() >= 42 ? (pushSubscription.serviceWorkerPath = pushsenderConfig.swPath,
                pushSubscription.registerServiceWorker(),
                manageSubscription.syncUnsubscribedUsers()) : /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent) && "serviceWorker"in navigator ? (pushSubscription.serviceWorkerPath = pushsenderConfig.firefoxSwPath,
                pushSubscription.registerServiceWorker(),
                manageSubscription.syncUnsubscribedUsers()) : "safari"in window && "serviceWorker"in navigator && pushAPI.pushSubscription.detectSafariVersion() >= 16 && (pushSubscription.serviceWorkerPath = pushsenderConfig.swPath,
                pushSubscription.registerServiceWorker(),
                manageSubscription.syncUnsubscribedUsers()),
                "denied" === Notification.permission && (pushAPI.storageUtil.addToStorage(pushsenderConfig.prefix_tag + "push_subscription_status", "blocked", 2e3),
                !pushsenderConfig.diplayConfig.Native.replyEnabled))
                    return !1;
                promise = pushSubscription.getUserSubscription(pushSubscription.serviceWorkerPath);
                promise.then(function(response) {
                    var p4sPushSubscriberId = pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscriber_id"), promise, subscribePromise;
                    response === "needUnsubscribe" ? (promise = pushSubscription.unsubscribe(),
                    promise.then(function() {
                        if (pushSubscription.canPushBeEnabled === !0) {
                            var subscribePromise = pushSubscription.subscribe(isApiCall);
                            addMyClass("#js-spinner", "hide");
                            removeMyClass("#SubscriptionErrors", "hide");
                            subscribePromise.then(function(newSubscription) {
                                "denied" === newSubscription ? pushAPI.storageUtil.addToStorage(pushsenderConfig.prefix_tag + "push_subscription_status", "blocked", 2e3) : "error" === newSubscription || (manageSubscription.doesUserResponseExists = !0,
                                manageSubscription.setNewPushSubscriber(newSubscription, !1))
                            })
                        }
                    })) : response === !1 ? pushSubscription.canPushBeEnabled === !0 && (addBackDiv(),
                    subscribePromise = pushSubscription.subscribe(isApiCall),
                    addMyClass("#js-spinner", "hide"),
                    removeMyClass("#SubscriptionErrors", "hide"),
                    subscribePromise.then(function(newSubscription) {
                        "denied" === newSubscription ? pushAPI.storageUtil.addToStorage(pushsenderConfig.prefix_tag + "push_subscription_status", "blocked", 2e3) : "error" === newSubscription || (manageSubscription.doesUserResponseExists = !0,
                        manageSubscription.setNewPushSubscriber(newSubscription, !1))
                    })) : (manageSubscription.doesUserResponseExists = !0,
                    manageSubscription.updateSubscription(response))
                })
            }
            return typeof MessengerConfig != "undefined" && initFbMessenger(),
            pushsenderConfig.diplayConfig.Bell.display == !0 && components.notification.showBell(),
            bitrixBasket = pushAPI.bitrixBasket,
            Integration = pushAPI.Integration,
            storageUtil = pushAPI.storageUtil,
            eventsApi = pushAPI.eventsApi,
            childWindowURL = "1" == pushsenderConfig.subdomainFlag ? pushsenderConfig.selfHostedSubdomainUrl : "https://" + pushsenderConfig.subdomain + "." + pushsenderConfig.serverSyncUrl.replace(/.*?:\/\//g, ""),
            isChromeSupported = "chrome"in window && ("serviceWorker"in navigator || pushsenderConfig.selfSubscribeDomain == !1) && getBrowser().version >= 42,
            isFirefoxSupported = /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent) && ("serviceWorker"in navigator || pushsenderConfig.selfSubscribeDomain == !1) && getBrowser().version >= 44,
            parseFloat(getAndroidVersion()),
            isSafariSupported = pushsenderConfig.SafariEnabled && "safari"in window && "pushNotification"in window.safari,
            /webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Edge/i.test(navigator.userAgent) && (isFirefoxSupported = !1,
            isChromeSupported = !1),
            isChromeSupported || isFirefoxSupported || isSafariSupported ? (detectPrivateMode(function(is_private) {
                if (is_private)
                    pushsender.isAPIReady = APIReadyState.FAILED;
                else {
                    var apiInitialization = function() {
                        storageUtil.initialiseState(pushsenderConfig.domainForStorageUtil);
                        pushAPI.referrerUtil.updateReferrer();
                        _pushsender.initAPIValues();
                        pushsender.isAPIReady = APIReadyState.READY;
                        document.addEventListener("initSubscription", function(e) {
                            e ? initPushNotificationsSubscription(e.isApiCall) : initPushNotificationsSubscription(!1)
                        }, !1);
                        document.getElementById("a");
                        getMyElementsList("[data-p4s_action]").forEach(function(availableElements) {
                            availableElements.addEventListener("click", function(e) {
                                if (pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscriber_id")) {
                                    var url = "https://push4site.com/subscriber/addActivityRecord?action=" + e.target.getAttribute("data-p4s_action") + "&subscriberId=" + pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscriber_id");
                                    try {
                                        fetch(url)
                                    } catch (e) {}
                                }
                            })
                        });
                        pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscriber_id") && (pushsenderConfig.Integrations.Avangate.enabled && getMyElementsList("a").forEach(function(availableElements) {
                            availableElements.addEventListener("click", function(e) {
                                Integration.Avangate(e, pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscriber_id"))
                            })
                        }),
                        Notification.permission === "granted" && pushAPI.pushSubscription.getUserSubscription(pushAPI.pushSubscription.serviceWorkerPath).then(function(result) {
                            result === !1 && (initPushNotifications(),
                            document.dispatchEvent(new Event("initSubscription",{
                                isApiCall: !1
                            })))
                        }));
                        pushsender.isAPIReady && ("blocked" !== pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscription_status") || pushsenderConfig.diplayConfig.Native.display) && (pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscriber_id") && fetch(pushsenderConfig.trackUrl, {
                            method: "post",
                            body: transformInToFormObject({
                                subscriberId: pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscriber_id"),
                                url: document.location.toString()
                            }),
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            }
                        }),
                        "subscribed" !== pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscription_status") && "unsubscribed" !== pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscription_status") ? (initPushNotifications(),
                        document.body.addEventListener("click", function(event) {
                            (event.target.id == "pushsender-mobile_allow_button" || event.target.classList.contains("pushsender-btn-allow")) && document.dispatchEvent(new Event("initSubscription",{
                                isApiCall: !1
                            }))
                        })) : "subscribed" === pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscription_status") && (typeof BasketConfig != "undefined" && pushAPI.bitrixBasket.validateBasket(pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscriber_id")),
                        pushsenderConfig.needTrackEvents && pushAPI.eventsApi.validateEvents(pushAPI.storageUtil.getFromStorage(pushsenderConfig.prefix_tag + "push_subscriber_id"))))
                    };
                    cssUrl = pushsenderConfig.cssUrl;
                    cssUrl ? (head = document.getElementsByTagName("head")[0],
                    link = document.createElement("link"),
                    link.type = "text/css",
                    link.rel = "stylesheet",
                    link.href = cssUrl,
                    head.appendChild(link),
                    link.onload = apiInitialization) : apiInitialization()
                }
            }),
            void (window.pushsender = pushsender)) : pushsender.isAPIReady = APIReadyState.FAILED
        }
    }
    ;
    document.readyState == "complete" ? onReadyStateChange() : document.onreadystatechange = onReadyStateChange
}
)()
