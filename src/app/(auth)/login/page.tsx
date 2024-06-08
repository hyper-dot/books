"use client";
import Link from "next/link";
import { H2 } from "@/components/ui/typography";
import { BackBtn } from "@/components/common/BackBtn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/common/Logo";

import { FormErr } from "@/components/form/FormErr";
import FormSubmitBtn from "@/components/form/FormSubmitBtn";

export default function page() {
  const onSubmit = async () => {};

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-4">
      <div className="fixed left-4 top-4">
        <Logo />
      </div>

      <div className="w-full max-w-sm">
        <BackBtn />
        <H2>Welcome Back,</H2>
      </div>
      <form className="w-full max-w-sm space-y-4">
        <div>
          <Label>Email</Label>
          <Input type="email" placeholder="Enter your email here" />
          <FormErr></FormErr>
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" placeholder="Enter your email here" />
          <FormErr></FormErr>
        </div>
        <div>
          <Link href="/forgot" className="hover:text-muted-foreground">
            Forgot Password ?
          </Link>
        </div>

        <div className="space-y-2">
          <FormSubmitBtn className="w-full" isSubmitting={false}>
            Login
          </FormSubmitBtn>

          <p className="text-center">Or</p>

          <Button type="button" className="flex w-full gap-2" variant="outline">
            <img width={20} src="/google.svg" alt="" />
            Continue with Google
          </Button>

          <p className="pt-5 text-center">
            Don't have an account ?{" "}
            <Link
              className="text-blue-500 underline-offset-2 hover:underline"
              href="/register"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
