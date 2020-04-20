<script>
  import DynamicAttr from "./dynamic-attr/index.svelte";
  import HtmlTags from "./html-tags/index.svelte";
  import ReactiveStatements from "./reactive-statements/index.svelte";
  import SpreadProps from "./spread-props/index.svelte";
  import AwaitBlocks from "./await-blocks/index.svelte";
  import EventForwarding from "./event-forwarding/index.svelte";
  import BindingCanvas from "./binding-canvas/index.svelte";
  import Tick from "./tick/index.svelte";
  import CustomStores from "./custom-stores/index.svelte";
  import Spring from "./spring/index.svelte";
  import DeferredTransitions from "./deferred-transitions/index.svelte";
  import AnimateDirective from "./animate-directive/index.svelte";
  import ClassDirective from "./class-directive/index.svelte";
  import Modal from "./modal/index.svelte";
  import SvelteSelf from "./svelte-self/index.svelte";
  export let name;
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
  h1 {
    color: #21426d;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  h4 {
    margin-top: 50px;
    padding-top: 20px;
    border-top: 1px solid #f5f5f5;
    color: #1b7c30;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Hello {name}!</h1>
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps.
  </p>
</main>

<main>
  <h1>TEST</h1>
  <h4>Dynamic attributes</h4>
  <DynamicAttr />
  <h4>HTML tags</h4>
  <HtmlTags />
  <h4>Reactive Statements</h4>
  <ReactiveStatements />
  <h4>Spread Props</h4>
  <SpreadProps />
  <h4>Await Blocks</h4>
  <AwaitBlocks />
  <h4>Event Forwarding</h4>
  <EventForwarding />
  <h4>Bindi:this Canvas</h4>
  <BindingCanvas />
  <h4>Tick</h4>
  <Tick />
  <h4>Custom Stores</h4>
  <CustomStores />
  <h4>Spring</h4>
  <Spring />
  <h4>Deferred Transitions</h4>
  <DeferredTransitions />
  <h4>Animate Directive</h4>
  <AnimateDirective />
  <h4>Class Directive</h4>
  <ClassDirective />
  <h4>Modal</h4>
  <Modal />
  <h4>Svelte Self</h4>
  <SvelteSelf />
</main>
