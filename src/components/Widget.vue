<script setup lang="ts">
import { computed, ref } from 'vue';
import SignUpForm from "@/components/SignUpForm.vue";
import SignInForm from "@/components/SignInForm.vue";

const overlayContent = [
	{
		title: "Welcome Back!",
		description:
			"To keep connected with us please login with your personal info",
		button: "Sign Up",
	},
	{
		title: "Hello, Friend!",
		description: "Enter your personal details and start journey with us",
		button: "Sign In",
	},
];

const overlayClass = ref("");
const left = computed(() => overlayClass.value ? "left" : "");
const right = computed(() => overlayClass.value ? "" : "right");

const toggleOverlay = () => {
	overlayClass.value = overlayClass.value ? "" : "active";
};

</script>

<template>
	<div class="Widget">
		<SignInForm :class="right" />
		<SignUpForm :class="left" />

		<div :class="['Widget-overlay', overlayClass]">
			<div class="Widget-overlay-content">
				<div class="Widget-overlay-panel" v-for="{ title, description, button } of overlayContent">
					<h3 class="Widget-overlay-title">{{ title }}</h3>
					<p class="Widget-overlay-text">{{ description }}</p>
					<button class="Widget-overlay-btn" @click="toggleOverlay">
						{{ button }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.Widget {
	position: relative;
	border-radius: 1rem;
	display: flex;
	align-items: center;
	background-color: var(--white);
	box-shadow:
		0 14px 28px rgba(0, 0, 0, 0.25),
		0 10px 10px rgba(0, 0, 0, 0.22);
	overflow: hidden;
	min-width: 768px;
	max-width: 1000px;
	min-height: 550px;

	&-overlay {
		position: absolute;
		width: 50%;
		top: 0;
		bottom: 0;
		right: 0;
		background: linear-gradient(to right, #ff4b2b, #ff416c);
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 0 0;
		color: var(--white);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.65s ease-in-out;
		z-index: 10;

		&.active {
			transform: translateX(-100%);

			.Widget-overlay-content {
				transform: translateX(-50%);
			}
		}

		&-content {
			position: absolute;
			width: 200%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			left: 0;
			transition: transform 0.65s ease-in-out;
			overflow: hidden;
		}

		&-panel {
			max-width: 75%;
			width: 100%;
			margin: 0 auto;
		}

		&-title {
			font-size: var(--fSize32);
			font-family: 800;
			color: var(--white);
			margin-bottom: 1.5rem;
			text-align: center;
		}

		&-text {
			font-size: var(--fSize16);
			color: var(--white);
			margin-bottom: 1.5rem;
			text-align: center;
			line-height: 1.5;
		}

		&-btn {
			background-color: transparent;
			padding: 0.825rem 1.25rem;
			font-size: var(--fSize14);
			color: var(--white);
			border-radius: 2rem;
			min-width: 150px;
			text-transform: uppercase;
			letter-spacing: 0.05rem;
			margin: 1.5rem auto 0 auto;
			border: 1px solid var(--white);
		}
	}
}
</style>
