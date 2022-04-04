
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }

    const is_client = typeof window !== 'undefined';
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function select_options(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            option.selected = ~value.indexOf(option.__value);
        }
    }
    function select_multiple_value(select) {
        return [].map.call(select.querySelectorAll(':checked'), option => option.__value);
    }
    // unfortunately this can't be a constant as that wouldn't be tree-shakeable
    // so we cache the result instead
    let crossorigin;
    function is_crossorigin() {
        if (crossorigin === undefined) {
            crossorigin = false;
            try {
                if (typeof window !== 'undefined' && window.parent) {
                    void window.parent.document;
                }
            }
            catch (error) {
                crossorigin = true;
            }
        }
        return crossorigin;
    }
    function add_resize_listener(node, fn) {
        const computed_style = getComputedStyle(node);
        if (computed_style.position === 'static') {
            node.style.position = 'relative';
        }
        const iframe = element('iframe');
        iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
            'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.tabIndex = -1;
        const crossorigin = is_crossorigin();
        let unsubscribe;
        if (crossorigin) {
            iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
            unsubscribe = listen(window, 'message', (event) => {
                if (event.source === iframe.contentWindow)
                    fn();
            });
        }
        else {
            iframe.src = 'about:blank';
            iframe.onload = () => {
                unsubscribe = listen(iframe.contentWindow, 'resize', fn);
            };
        }
        append(node, iframe);
        return () => {
            if (crossorigin) {
                unsubscribe();
            }
            else if (unsubscribe && iframe.contentWindow) {
                unsubscribe();
            }
            detach(iframe);
        };
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function beforeUpdate(fn) {
        get_current_component().$$.before_update.push(fn);
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.4' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/Bomb/Room.svelte generated by Svelte v3.46.4 */
    const file$a = "src/Bomb/Room.svelte";

    function create_fragment$a(ctx) {
    	let div;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button = element("button");
    			button.textContent = "Detonate";
    			add_location(button, file$a, 13, 2, 216);
    			attr_dev(div, "class", "safe-room svelte-9fhowh");
    			add_location(div, file$a, 12, 0, 190);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*goAhead*/ ctx[0], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Room', slots, []);
    	const send = createEventDispatcher();

    	const goAhead = () => {
    		send("click", { blast: true });
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Room> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ createEventDispatcher, send, goAhead });
    	return [goAhead];
    }

    class Room extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Room",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src/Bomb/Bomb.svelte generated by Svelte v3.46.4 */

    const { console: console_1$3 } = globals;
    const file$9 = "src/Bomb/Bomb.svelte";

    function create_fragment$9(ctx) {
    	let div2;
    	let div0;
    	let t;
    	let div1;
    	let button;
    	let current;
    	button = new Room({ $$inline: true });
    	button.$on("click", /*detonateBomb*/ ctx[1]);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t = space();
    			div1 = element("div");
    			create_component(button.$$.fragment);
    			attr_dev(div0, "class", "bomb svelte-aix6ub");
    			toggle_class(div0, "blast", /*blast*/ ctx[0]);
    			add_location(div0, file$9, 11, 2, 200);
    			attr_dev(div1, "class", "button svelte-aix6ub");
    			add_location(div1, file$9, 12, 2, 235);
    			attr_dev(div2, "class", "lab svelte-aix6ub");
    			add_location(div2, file$9, 10, 0, 180);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t);
    			append_dev(div2, div1);
    			mount_component(button, div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*blast*/ 1) {
    				toggle_class(div0, "blast", /*blast*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Bomb', slots, []);
    	let blast;

    	const detonateBomb = event => {
    		console.log(event.detail.blast);
    		$$invalidate(0, blast = event.detail.blast);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$3.warn(`<Bomb> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Button: Room, blast, detonateBomb });

    	$$self.$inject_state = $$props => {
    		if ('blast' in $$props) $$invalidate(0, blast = $$props.blast);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [blast, detonateBomb];
    }

    class Bomb extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Bomb",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/Bind/Select.svelte generated by Svelte v3.46.4 */

    const { console: console_1$2 } = globals;
    const file$8 = "src/Bind/Select.svelte";

    function create_fragment$8(ctx) {
    	let h1;
    	let t0;
    	let t1;
    	let select;
    	let option0;
    	let option1;
    	let option2;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t0 = text(/*value*/ ctx[0]);
    			t1 = space();
    			select = element("select");
    			option0 = element("option");
    			option0.textContent = "Car";
    			option1 = element("option");
    			option1.textContent = "Train";
    			option2 = element("option");
    			option2.textContent = "Aeroplane";
    			add_location(h1, file$8, 5, 0, 70);
    			option0.__value = "car";
    			option0.value = option0.__value;
    			add_location(option0, file$8, 7, 2, 132);
    			option1.__value = "train";
    			option1.value = option1.__value;
    			add_location(option1, file$8, 8, 2, 167);
    			option2.__value = "aeroplane";
    			option2.value = option2.__value;
    			add_location(option2, file$8, 9, 2, 206);
    			attr_dev(select, "name", "");
    			attr_dev(select, "id", "");
    			select.multiple = true;
    			if (/*value*/ ctx[0] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[1].call(select));
    			add_location(select, file$8, 6, 0, 87);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, select, anchor);
    			append_dev(select, option0);
    			append_dev(select, option1);
    			append_dev(select, option2);
    			select_options(select, /*value*/ ctx[0]);

    			if (!mounted) {
    				dispose = listen_dev(select, "change", /*select_change_handler*/ ctx[1]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*value*/ 1) set_data_dev(t0, /*value*/ ctx[0]);

    			if (dirty & /*value*/ 1) {
    				select_options(select, /*value*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(select);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Select', slots, []);
    	let value = [];
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$2.warn(`<Select> was created with unknown prop '${key}'`);
    	});

    	function select_change_handler() {
    		value = select_multiple_value(this);
    		$$invalidate(0, value);
    	}

    	$$self.$capture_state = () => ({ value });

    	$$self.$inject_state = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*value*/ 1) {
    			console.log(typeof value);
    		}
    	};

    	return [value, select_change_handler];
    }

    class Select extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Select",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/Bind/Box.svelte generated by Svelte v3.46.4 */

    const { console: console_1$1 } = globals;
    const file$7 = "src/Bind/Box.svelte";

    function create_fragment$7(ctx) {
    	let div3;
    	let div0;
    	let t0;
    	let div2;
    	let div1;
    	let div1_resize_listener;
    	let t1;
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div2 = element("div");
    			div1 = element("div");
    			t1 = space();
    			input = element("input");
    			attr_dev(div0, "class", "box svelte-xsesjn");
    			add_location(div0, file$7, 18, 2, 270);
    			attr_dev(div1, "class", "box svelte-xsesjn");
    			set_style(div1, "width", /*width*/ ctx[1] + "px");
    			add_render_callback(() => /*div1_elementresize_handler*/ ctx[4].call(div1));
    			add_location(div1, file$7, 20, 4, 319);
    			attr_dev(input, "type", "range");
    			attr_dev(input, "name", "");
    			attr_dev(input, "id", "");
    			add_location(input, file$7, 26, 4, 449);
    			add_location(div2, file$7, 19, 2, 309);
    			attr_dev(div3, "class", "group svelte-xsesjn");
    			add_location(div3, file$7, 17, 0, 248);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			/*div0_binding*/ ctx[3](div0);
    			append_dev(div3, t0);
    			append_dev(div3, div2);
    			append_dev(div2, div1);
    			div1_resize_listener = add_resize_listener(div1, /*div1_elementresize_handler*/ ctx[4].bind(div1));
    			append_dev(div2, t1);
    			append_dev(div2, input);
    			set_input_value(input, /*width*/ ctx[1]);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_input_handler*/ ctx[5]),
    					listen_dev(input, "input", /*input_change_input_handler*/ ctx[5])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*width*/ 2) {
    				set_style(div1, "width", /*width*/ ctx[1] + "px");
    			}

    			if (dirty & /*width*/ 2) {
    				set_input_value(input, /*width*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			/*div0_binding*/ ctx[3](null);
    			div1_resize_listener();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Box', slots, []);
    	let boxy;
    	let width = 100;
    	let height;

    	onMount(() => {
    		$$invalidate(0, boxy.style = "background-color:red; width:100px", boxy);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<Box> was created with unknown prop '${key}'`);
    	});

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			boxy = $$value;
    			$$invalidate(0, boxy);
    		});
    	}

    	function div1_elementresize_handler() {
    		width = this.clientWidth;
    		height = this.clientHeight;
    		$$invalidate(1, width);
    		$$invalidate(2, height);
    	}

    	function input_change_input_handler() {
    		width = to_number(this.value);
    		$$invalidate(1, width);
    	}

    	$$self.$capture_state = () => ({ onMount, boxy, width, height });

    	$$self.$inject_state = $$props => {
    		if ('boxy' in $$props) $$invalidate(0, boxy = $$props.boxy);
    		if ('width' in $$props) $$invalidate(1, width = $$props.width);
    		if ('height' in $$props) $$invalidate(2, height = $$props.height);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*boxy, width, height*/ 7) {
    			{
    				console.log(boxy);
    				console.log(width, height);
    			}
    		}
    	};

    	return [
    		boxy,
    		width,
    		height,
    		div0_binding,
    		div1_elementresize_handler,
    		input_change_input_handler
    	];
    }

    class Box extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Box",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/Video.svelte generated by Svelte v3.46.4 */

    const file$6 = "src/Video.svelte";

    function create_fragment$6(ctx) {
    	let video;
    	let track;
    	let video_src_value;
    	let video_is_paused = true;
    	let video_updating = false;
    	let video_animationframe;
    	let t0;
    	let p;
    	let t1_value = (/*_currentTime*/ ctx[3] / 60).toFixed(2) + "";
    	let t1;
    	let t2;
    	let t3_value = (/*_duration*/ ctx[2] / 60).toFixed(2) + "";
    	let t3;
    	let t4;
    	let button;
    	let t6;
    	let t7_value = Math.floor(/*_volume*/ ctx[1] * 100) + "";
    	let t7;
    	let t8;
    	let input;
    	let mounted;
    	let dispose;

    	function video_timeupdate_handler() {
    		cancelAnimationFrame(video_animationframe);

    		if (!video.paused) {
    			video_animationframe = raf(video_timeupdate_handler);
    			video_updating = true;
    		}

    		/*video_timeupdate_handler*/ ctx[10].call(video);
    	}

    	const block = {
    		c: function create() {
    			video = element("video");
    			track = element("track");
    			t0 = space();
    			p = element("p");
    			t1 = text(t1_value);
    			t2 = text(" / ");
    			t3 = text(t3_value);
    			t4 = space();
    			button = element("button");
    			button.textContent = "Play";
    			t6 = space();
    			t7 = text(t7_value);
    			t8 = space();
    			input = element("input");
    			attr_dev(track, "kind", "captions");
    			add_location(track, file$6, 23, 2, 508);
    			attr_dev(video, "poster", /*poster*/ ctx[4]);
    			if (!src_url_equal(video.src, video_src_value = /*src*/ ctx[5])) attr_dev(video, "src", video_src_value);
    			attr_dev(video, "class", "svelte-sdbn1r");
    			if (/*_duration*/ ctx[2] === void 0) add_render_callback(() => /*video_durationchange_handler*/ ctx[9].call(video));
    			add_location(video, file$6, 15, 0, 368);
    			add_location(p, file$6, 25, 0, 543);
    			add_location(button, file$6, 28, 0, 619);
    			attr_dev(input, "type", "range");
    			attr_dev(input, "name", "");
    			attr_dev(input, "id", "");
    			attr_dev(input, "max", "1");
    			attr_dev(input, "step", "0.01");
    			add_location(input, file$6, 30, 0, 692);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, video, anchor);
    			append_dev(video, track);

    			if (!isNaN(/*_volume*/ ctx[1])) {
    				video.volume = /*_volume*/ ctx[1];
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, p, anchor);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(p, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, button, anchor);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*_volume*/ ctx[1]);

    			if (!mounted) {
    				dispose = [
    					listen_dev(video, "play", /*video_play_pause_handler*/ ctx[7]),
    					listen_dev(video, "pause", /*video_play_pause_handler*/ ctx[7]),
    					listen_dev(video, "volumechange", /*video_volumechange_handler*/ ctx[8]),
    					listen_dev(video, "durationchange", /*video_durationchange_handler*/ ctx[9]),
    					listen_dev(video, "timeupdate", video_timeupdate_handler),
    					listen_dev(button, "click", /*playVideo*/ ctx[6], false, false, false),
    					listen_dev(input, "change", /*input_change_input_handler*/ ctx[11]),
    					listen_dev(input, "input", /*input_change_input_handler*/ ctx[11])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*_paused*/ 1 && video_is_paused !== (video_is_paused = /*_paused*/ ctx[0])) {
    				video[video_is_paused ? "pause" : "play"]();
    			}

    			if (dirty & /*_volume*/ 2 && !isNaN(/*_volume*/ ctx[1])) {
    				video.volume = /*_volume*/ ctx[1];
    			}

    			if (!video_updating && dirty & /*_currentTime*/ 8 && !isNaN(/*_currentTime*/ ctx[3])) {
    				video.currentTime = /*_currentTime*/ ctx[3];
    			}

    			video_updating = false;
    			if (dirty & /*_currentTime*/ 8 && t1_value !== (t1_value = (/*_currentTime*/ ctx[3] / 60).toFixed(2) + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*_duration*/ 4 && t3_value !== (t3_value = (/*_duration*/ ctx[2] / 60).toFixed(2) + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*_volume*/ 2 && t7_value !== (t7_value = Math.floor(/*_volume*/ ctx[1] * 100) + "")) set_data_dev(t7, t7_value);

    			if (dirty & /*_volume*/ 2) {
    				set_input_value(input, /*_volume*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(video);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(button);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(input);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Video', slots, []);
    	let _paused = true;
    	let _volume = 0;
    	let _duration;
    	let _currentTime = 0;
    	let poster = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg";
    	let src = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    	function playVideo() {
    		$$invalidate(0, _paused = !_paused);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Video> was created with unknown prop '${key}'`);
    	});

    	function video_play_pause_handler() {
    		_paused = this.paused;
    		$$invalidate(0, _paused);
    	}

    	function video_volumechange_handler() {
    		_volume = this.volume;
    		$$invalidate(1, _volume);
    	}

    	function video_durationchange_handler() {
    		_duration = this.duration;
    		$$invalidate(2, _duration);
    	}

    	function video_timeupdate_handler() {
    		_currentTime = this.currentTime;
    		$$invalidate(3, _currentTime);
    	}

    	function input_change_input_handler() {
    		_volume = to_number(this.value);
    		$$invalidate(1, _volume);
    	}

    	$$self.$capture_state = () => ({
    		_paused,
    		_volume,
    		_duration,
    		_currentTime,
    		poster,
    		src,
    		playVideo
    	});

    	$$self.$inject_state = $$props => {
    		if ('_paused' in $$props) $$invalidate(0, _paused = $$props._paused);
    		if ('_volume' in $$props) $$invalidate(1, _volume = $$props._volume);
    		if ('_duration' in $$props) $$invalidate(2, _duration = $$props._duration);
    		if ('_currentTime' in $$props) $$invalidate(3, _currentTime = $$props._currentTime);
    		if ('poster' in $$props) $$invalidate(4, poster = $$props.poster);
    		if ('src' in $$props) $$invalidate(5, src = $$props.src);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		_paused,
    		_volume,
    		_duration,
    		_currentTime,
    		poster,
    		src,
    		playVideo,
    		video_play_pause_handler,
    		video_volumechange_handler,
    		video_durationchange_handler,
    		video_timeupdate_handler,
    		input_change_input_handler
    	];
    }

    class Video extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Video",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/LiftCycle.svelte generated by Svelte v3.46.4 */
    const file$5 = "src/LiftCycle.svelte";

    function create_fragment$5(ctx) {
    	let h1;
    	let t0;
    	let t1;
    	let t2;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t0 = text("Hello ");
    			t1 = text(/*name*/ ctx[0]);
    			t2 = space();
    			button = element("button");
    			button.textContent = "Update";
    			add_location(h1, file$5, 27, 0, 494);
    			add_location(button, file$5, 29, 0, 517);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t0);
    			append_dev(h1, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*updateGreeting*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 1) set_data_dev(t1, /*name*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LiftCycle', slots, []);
    	let name = "world";

    	beforeUpdate(() => {
    		
    	}); // console.log("Before");

    	onMount(() => {
    		
    	}); // console.log("Mounted");

    	afterUpdate(() => {
    		
    	}); // console.log("After");

    	onDestroy(() => {
    		
    	}); // console.log("Destroy");

    	const updateGreeting = async () => {
    		$$invalidate(0, name = "Sharath");
    		await tick();
    		$$invalidate(0, name = "Jhon");
    		await tick();
    		$$invalidate(0, name = "Micle");
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LiftCycle> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onMount,
    		onDestroy,
    		beforeUpdate,
    		afterUpdate,
    		tick,
    		name,
    		updateGreeting
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name, updateGreeting];
    }

    class LiftCycle extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LiftCycle",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const pain = writable('nil');

    /* src/Legs/Brain.svelte generated by Svelte v3.46.4 */
    const file$4 = "src/Legs/Brain.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span = element("span");
    			t = text(/*$pain*/ ctx[0]);
    			add_location(span, file$4, 7, 2, 102);
    			attr_dev(div, "class", "brain svelte-16wzlm6");
    			add_location(div, file$4, 6, 0, 80);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);
    			append_dev(span, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$pain*/ 1) set_data_dev(t, /*$pain*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let $pain;
    	validate_store(pain, 'pain');
    	component_subscribe($$self, pain, $$value => $$invalidate(0, $pain = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Brain', slots, []);
    	set_store_value(pain, $pain = "pleasure", $pain);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Brain> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ pain, $pain });
    	return [$pain];
    }

    class Brain extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Brain",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/Legs/Legs.svelte generated by Svelte v3.46.4 */
    const file$3 = "src/Legs/Legs.svelte";

    function create_fragment$3(ctx) {
    	let div;
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span = element("span");
    			t = text(/*$pain*/ ctx[0]);
    			attr_dev(span, "class", "svelte-1leixya");
    			add_location(span, file$3, 5, 2, 78);
    			attr_dev(div, "class", "legs svelte-1leixya");
    			add_location(div, file$3, 4, 0, 57);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);
    			append_dev(span, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$pain*/ 1) set_data_dev(t, /*$pain*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $pain;
    	validate_store(pain, 'pain');
    	component_subscribe($$self, pain, $$value => $$invalidate(0, $pain = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Legs', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Legs> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ pain, $pain });
    	return [$pain];
    }

    class Legs extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Legs",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/Legs/Body.svelte generated by Svelte v3.46.4 */
    const file$2 = "src/Legs/Body.svelte";

    function create_fragment$2(ctx) {
    	let div;
    	let brain;
    	let t;
    	let legs;
    	let current;
    	brain = new Brain({ $$inline: true });
    	legs = new Legs({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(brain.$$.fragment);
    			t = space();
    			create_component(legs.$$.fragment);
    			attr_dev(div, "class", "body svelte-iyba70");
    			add_location(div, file$2, 5, 0, 94);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(brain, div, null);
    			append_dev(div, t);
    			mount_component(legs, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(brain.$$.fragment, local);
    			transition_in(legs.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(brain.$$.fragment, local);
    			transition_out(legs.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(brain);
    			destroy_component(legs);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Body', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Body> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Brain, Legs });
    	return [];
    }

    class Body extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Body",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/Nav.svelte generated by Svelte v3.46.4 */

    const { console: console_1 } = globals;
    const file$1 = "src/Nav.svelte";

    // (63:2) {#if dropdown}
    function create_if_block(ctx) {
    	let ul;
    	let li0;
    	let a0;
    	let t1;
    	let li1;
    	let a1;
    	let t3;
    	let li2;
    	let a2;

    	const block = {
    		c: function create() {
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "Login";
    			t1 = space();
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "Signup";
    			t3 = space();
    			li2 = element("li");
    			a2 = element("a");
    			a2.textContent = "Account";
    			attr_dev(a0, "href", "/");
    			add_location(a0, file$1, 64, 10, 1141);
    			attr_dev(li0, "class", "svelte-fp2ux7");
    			add_location(li0, file$1, 64, 6, 1137);
    			attr_dev(a1, "href", "/");
    			add_location(a1, file$1, 65, 10, 1178);
    			attr_dev(li1, "class", "svelte-fp2ux7");
    			add_location(li1, file$1, 65, 6, 1174);
    			attr_dev(a2, "href", "/");
    			add_location(a2, file$1, 66, 10, 1216);
    			attr_dev(li2, "class", "svelte-fp2ux7");
    			add_location(li2, file$1, 66, 6, 1212);
    			attr_dev(ul, "class", "svelte-fp2ux7");
    			add_location(ul, file$1, 63, 4, 1126);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(ul, t1);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    			append_dev(ul, t3);
    			append_dev(ul, li2);
    			append_dev(li2, a2);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(63:2) {#if dropdown}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let nav;
    	let ul;
    	let li0;
    	let a0;
    	let li0_class_value;
    	let t1;
    	let li1;
    	let a1;
    	let li1_class_value;
    	let t3;
    	let li2;
    	let a2;
    	let li2_class_value;
    	let t5;
    	let li3;
    	let label;
    	let t6;
    	let input;
    	let t7;
    	let mounted;
    	let dispose;
    	let if_block = /*dropdown*/ ctx[1] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "Home";
    			t1 = space();
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "About";
    			t3 = space();
    			li2 = element("li");
    			a2 = element("a");
    			a2.textContent = "Contact";
    			t5 = space();
    			li3 = element("li");
    			label = element("label");
    			t6 = text("My Account\n        ");
    			input = element("input");
    			t7 = space();
    			if (if_block) if_block.c();
    			attr_dev(a0, "href", "/");
    			attr_dev(a0, "class", "svelte-fp2ux7");
    			add_location(a0, file$1, 36, 6, 607);
    			attr_dev(li0, "class", li0_class_value = "" + (null_to_empty(/*page*/ ctx[0] == "home" && "active") + " svelte-fp2ux7"));
    			add_location(li0, file$1, 30, 4, 498);
    			attr_dev(a1, "href", "/");
    			attr_dev(a1, "class", "svelte-fp2ux7");
    			add_location(a1, file$1, 44, 6, 752);
    			attr_dev(li1, "class", li1_class_value = "" + (null_to_empty(/*page*/ ctx[0] == "about" && "active") + " svelte-fp2ux7"));
    			add_location(li1, file$1, 38, 4, 642);
    			attr_dev(a2, "href", "/");
    			attr_dev(a2, "class", "svelte-fp2ux7");
    			add_location(a2, file$1, 52, 6, 900);
    			attr_dev(li2, "class", li2_class_value = "" + (null_to_empty(/*page*/ ctx[0] == "contact" && "active") + " svelte-fp2ux7"));
    			add_location(li2, file$1, 46, 4, 788);
    			attr_dev(input, "type", "checkbox");
    			attr_dev(input, "name", "");
    			attr_dev(input, "id", "dropdown");
    			add_location(input, file$1, 58, 8, 1000);
    			attr_dev(label, "for", "dropdown");
    			add_location(label, file$1, 56, 6, 950);
    			attr_dev(li3, "class", "svelte-fp2ux7");
    			add_location(li3, file$1, 55, 4, 939);
    			attr_dev(ul, "class", "svelte-fp2ux7");
    			add_location(ul, file$1, 29, 2, 489);
    			add_location(nav, file$1, 28, 0, 481);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(ul, t1);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    			append_dev(ul, t3);
    			append_dev(ul, li2);
    			append_dev(li2, a2);
    			append_dev(ul, t5);
    			append_dev(ul, li3);
    			append_dev(li3, label);
    			append_dev(label, t6);
    			append_dev(label, input);
    			input.checked = /*dropdown*/ ctx[1];
    			append_dev(nav, t7);
    			if (if_block) if_block.m(nav, null);

    			if (!mounted) {
    				dispose = [
    					listen_dev(li0, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(li1, "click", /*click_handler_1*/ ctx[4], false, false, false),
    					listen_dev(li2, "click", /*click_handler_2*/ ctx[5], false, false, false),
    					listen_dev(input, "change", /*input_change_handler*/ ctx[6])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*page*/ 1 && li0_class_value !== (li0_class_value = "" + (null_to_empty(/*page*/ ctx[0] == "home" && "active") + " svelte-fp2ux7"))) {
    				attr_dev(li0, "class", li0_class_value);
    			}

    			if (dirty & /*page*/ 1 && li1_class_value !== (li1_class_value = "" + (null_to_empty(/*page*/ ctx[0] == "about" && "active") + " svelte-fp2ux7"))) {
    				attr_dev(li1, "class", li1_class_value);
    			}

    			if (dirty & /*page*/ 1 && li2_class_value !== (li2_class_value = "" + (null_to_empty(/*page*/ ctx[0] == "contact" && "active") + " svelte-fp2ux7"))) {
    				attr_dev(li2, "class", li2_class_value);
    			}

    			if (dirty & /*dropdown*/ 2) {
    				input.checked = /*dropdown*/ ctx[1];
    			}

    			if (/*dropdown*/ ctx[1]) {
    				if (if_block) ; else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(nav, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Nav', slots, []);
    	let page = "home";
    	let dropdown = false;
    	const sendPage = createEventDispatcher();

    	const OnClick = e => {
    		console.log(e);

    		switch (e.target.innerText) {
    			case "Home":
    				$$invalidate(0, page = "home");
    				break;
    			case "About":
    				$$invalidate(0, page = "about");
    				break;
    			case "Contact":
    				$$invalidate(0, page = "contact");
    				break;
    		}

    		sendPage("page", { page });
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Nav> was created with unknown prop '${key}'`);
    	});

    	const click_handler = e => {
    		OnClick(e);
    	};

    	const click_handler_1 = e => {
    		OnClick(e);
    	};

    	const click_handler_2 = e => {
    		OnClick(e);
    	};

    	function input_change_handler() {
    		dropdown = this.checked;
    		$$invalidate(1, dropdown);
    	}

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		page,
    		dropdown,
    		sendPage,
    		OnClick
    	});

    	$$self.$inject_state = $$props => {
    		if ('page' in $$props) $$invalidate(0, page = $$props.page);
    		if ('dropdown' in $$props) $$invalidate(1, dropdown = $$props.dropdown);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		page,
    		dropdown,
    		OnClick,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		input_change_handler
    	];
    }

    class Nav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Nav",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    const userName = writable(localStorage.getItem("userName") || "Web Jeda..");
    userName.subscribe((val) => localStorage.setItem("userName", val));

    /* src/App.svelte generated by Svelte v3.46.4 */
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let h1;
    	let a;
    	let t1;
    	let hr;
    	let t2;
    	let nav;
    	let t3;
    	let h2;
    	let t4;
    	let t5;
    	let input;
    	let current;
    	let mounted;
    	let dispose;
    	nav = new Nav({ $$inline: true });
    	nav.$on("page", /*OnPage*/ ctx[1]);

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			a = element("a");
    			a.textContent = "WEB JEDA";
    			t1 = space();
    			hr = element("hr");
    			t2 = space();
    			create_component(nav.$$.fragment);
    			t3 = space();
    			h2 = element("h2");
    			t4 = text(/*$userName*/ ctx[0]);
    			t5 = space();
    			input = element("input");
    			attr_dev(a, "href", "/");
    			add_location(a, file, 17, 4, 416);
    			add_location(h1, file, 17, 0, 412);
    			add_location(hr, file, 18, 0, 447);
    			add_location(h2, file, 20, 0, 479);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "name", "");
    			attr_dev(input, "id", "");
    			add_location(input, file, 21, 0, 500);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, a);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, hr, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(nav, target, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t4);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$userName*/ ctx[0]);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[2]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*$userName*/ 1) set_data_dev(t4, /*$userName*/ ctx[0]);

    			if (dirty & /*$userName*/ 1 && input.value !== /*$userName*/ ctx[0]) {
    				set_input_value(input, /*$userName*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(nav.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(nav.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(hr);
    			if (detaching) detach_dev(t2);
    			destroy_component(nav, detaching);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(input);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $userName;
    	validate_store(userName, 'userName');
    	component_subscribe($$self, userName, $$value => $$invalidate(0, $userName = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let page;

    	const OnPage = e => {
    		page = e.detail.page;
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		$userName = this.value;
    		userName.set($userName);
    	}

    	$$self.$capture_state = () => ({
    		Bomb,
    		Select,
    		Box,
    		Video,
    		LiftCycle,
    		Body,
    		Nav,
    		userName,
    		page,
    		OnPage,
    		$userName
    	});

    	$$self.$inject_state = $$props => {
    		if ('page' in $$props) page = $$props.page;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$userName, OnPage, input_input_handler];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
